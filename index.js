const time = require("./src/functions/time");
const Discord = require("./src/functions/Discord");

module.exports = {
    stringifyTime: time.stringifyTime,
    parseTime: time.parseTime,
    wait: time.wait,
    updateClient: Discord.updateClient
}
