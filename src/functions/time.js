const {languageBuild, objectConstructor} = require("../structure.js");
const {error} = require("../errors/err");
const lang = languageBuild();

module.exports = {
	stringifyTime,
  parseTime,
  wait
};

/**
 * 
 * @lang => Choose the language of the values.
 * @long => Choose if you want abbreviations or not (true = no).
 * @format => Choose the String format (Y-MO-W-D-H-M-S-MS) => (MS-Y-D).
 * @separator => Choose the separator values (default is ", ").
 * @valueNull => Choose if it sets the value equal to 0.
 * @suppressTag => suppress the values name.
 * 
 **/

const format = ["Y","MO","W","D","H","M","S","MS"];
const keysSeparator = [",", "/", ";", ":", "-", "_"];

function stringifyTime(time, option = objectConstructor["stringifyTime"]) {
  if (!time) return error(lang.errors["VALUE_IS_NOT_DEFINED"], {type: "stringifyTime"}, "stringifyTime(500)");

  if (typeof(time) !== "number") return error(lang.errors["VALUE_NOT_NUMBER"], {type: "stringifyTime"}, "stringifyTime(500)");
  if (!option || typeof(option) !== "object") option = objectConstructor["stringifyTime"];
  if (!lang[option.lang]) option.lang = "en";

  let values = [31556926000, 2629743000, 604800000, 86400000, 3600000, 60000, 1000, 1];
  let optionFormat = false;

  if (option.format && typeof(option.format) === "string") {
    option.format = option.format.toUpperCase().split("-");
    for (let i = 0; i < format.length; i++) {
      if (!option.format.includes(format[i])) {
        values[i] = null;
      };
    };

    if (values.filter(r => r).length === 0) return error(lang.errors["TIMES_NULL"], {type: "stringifyTime"}, "stringifyTime(500, {format: 'Y-MO-W-D-H-M-S-MS'})");
    option.format = option.format.filter(r => format.includes(r));
    optionFormat = true;
  }

  let times = [];
  for (let i = 0; i < values.length; i++) {
    if (values[i]){
      times.push(Math.floor(time / values[i]));
      time -= times[i] * values[i];
    } else times.push(0);
  }

  times = times.map((t, i) => t === 0 && !option.valueNull ? null : t + (!option.suppressTag ? " " + lang[option.lang??"en"].times[i][!option.long ? 2 : t < 2 ? 0 : 1] : ""));
  
  if (optionFormat) {    
    const newTimes = [];

    for (let i = 0; i < option.format.length; i++) {
      const key = option.format[i];
      const find = format.indexOf(key);
      newTimes.push(times[find]);
    }

    times = newTimes;
  }
  const sep = option.separator && typeof(option.separator) === "string" ? option.separator : ", ";

  return times.filter(r => r).join(sep);
};

/**
 * 
 * @msValue => Have the value in ms or in seconds.
 * 
 **/

function parseTime(time, option = objectConstructor["parseTime"]) {
  if (!time) return error(lang.errors["VALUE_IS_NOT_DEFINED"], {type: "parseTime"}, "parseTime('2 days')");
  
  if (typeof(time) !== "string") return error(lang.errors["VALUE_NOT_STRING"], {type: "parseTime"}, "parseTime('2 days')");
  if (!option || typeof(option) !== "object") option = objectConstructor["parseTime"];
  
  let values = [31556926000, 2629743000, 604800000, 86400000, 3600000, 60000, 1000, 1];
  let times = 0;
  
  for (const separator of keysSeparator) {
    const reg = new RegExp(separator, "g");
    time = time.replace(reg, " ");
  };

  time = time.trim().split(" ").filter(r => r.length != 0);
  for (let i = 0; i < time.length; i++) {
    if (!isNaN(time[i])) {
      if (time[i+1]) time[i+1] = time[i]+time[i+1];
      time.splice(i, 1);
    };
  };
  for (const t of time) {
    const number = Number(t.replace(/[^0-9-]/g, "").replace(/--/g, ""));
    if (!isNaN(number)) {
      const key = t.toLowerCase().replace(/[^a-z]/g, "");
      let num = -1;

      Object.values(lang).find(r => r.times && r.times.find((b,i) => {
        num = i;
        return b.find(y => y == key);
      }));

      if (num != -1) {
        times += (number * values[num]);
      };

    } else return error(lang.errors["VALUE_NOT_NUMBER"], {type: "parseTime"}, "parseTime('2 days')");
  };
  if (!option.msValue) times = Math.floor(times/1000)
  return times;
};

async function wait(time) {
  if (!time) return error(lang.errors["VALUE_IS_NOT_DEFINED"], {type: "wait"}, "wait('10s') || wait(10000)");

  if (typeof(time) === "string") time = parseTime(time);
  if (typeof(time) !== "number") return error(lang.errors["VALUE_NOT_NUMBER"], {type: "wait"}, "wait('10s') || wait(10000)");
  const json = {startTime: Date.now(), endTime: (Date.now() + time), durationTime: time};

  return new Promise((resolve, N_w) => {
    setTimeout(function(){
      resolve(json);
    }, time);
  });
};