const json = require("../../package.json");

module.exports = {
    error
};

function error(str, option = {}, correction) {
    if (!str) str = "undefined";
    str = "\n[Package Name] - "+json.name+"@"+json.version+"\n\x1b[31m" + str + "\x1b[0m";
    
    if (option && typeof(option) === "object") {
        for (const [key, value] of Object.entries(option)){
            const regexp = new RegExp(`{${key}}`, "g");
            str = str.replace(regexp, value);
        }
    }
    if (correction) {
        str += "\n\x1b[32mCorrect usage: "+ correction +"\x1b[0m\n"
    }
    throw new Error(str)
}