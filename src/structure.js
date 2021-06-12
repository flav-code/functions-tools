const objectConstructor = {
    "stringifyTime": {
        lang: "en", 
        long: false, 
        format: "Y-MO-W-D-H-M-S-MS", 
        separator: ", ", 
        valueNull: false, 
        suppressTag: false
    },"parseTime": {
        ms: true
    }, "findArray": {
        all: false
    },"formatTime": {
        lang: "en", 
        format: "MMMM Do YYYY, hh:mm:ss"
    }, "randomArray": {
        number: 1,
        double: true
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