const objectConstructor = {
    "stringifyTime": {
        lang: "en", 
        long: false, 
        format: "Y-MO-W-D-H-M-S-MS", 
        separator: ", ", 
        valueNull: false, 
        suppressTag: false
    },"parseTime": {
        msValue: true
    }
}
let lang;

function languageBuild() {
    if (lang) {
        return lang;
    } else {
        lang = {};

        lang.fr = require("./json/fr.json");
        lang.en = require("./json/en.json");
        lang.errors = require("./errors/Message.json");

        return lang;
    }
}

module.exports = {
	languageBuild,
    objectConstructor
};