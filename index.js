const Time = require("./src/functions/Time");
const Discord = require("./src/functions/Discord");
const Find = require("./src/functions/Find");
const Numb = require("./src/functions/Number");
const info = require("./package.json");

console.log(Time.formatTime("10/06/2021", {lang: "en", format: "Do MM, YYYY | hh:mm"}))
module.exports = {
    version: info.version,

    stringifyTime: Time.stringifyTime,
    parseTime: Time.parseTime,
    wait: Time.wait,
    updateClient: Discord.updateClient,
    findArray: Find.findArray,
    numberToRoman: Numb.numberToRoman,
    romanToNumber: Numb.romanToNumber,
    formatTime: Time.formatTime
}
