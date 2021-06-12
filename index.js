const Time = require("./src/functions/Time");
const Discord = require("./src/functions/Discord");
const Array = require("./src/functions/Array");
const Numb = require("./src/functions/Number");
const Text = require("./src/functions/Text");
const Fonction = require("./src/functions/Fonction");
const {version} = require("./package.json");

module.exports = {
    version: version,

    replaceText: Text.replaceText,
    stringifyTime: Time.stringifyTime,
    parseTime: Time.parseTime,
    wait: Time.wait,
    formatTime: Time.formatTime,
    randomArray: Array.randomArray,
    findArray: Array.findArray,
    numberToRoman: Numb.numberToRoman,
    romanToNumber: Numb.romanToNumber,

    updateClient: Discord.updateClient
}
