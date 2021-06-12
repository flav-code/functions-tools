const {languageBuild, objectConstructor} = require("../structure");
const {error} = require("../errors/err");
const lang = languageBuild();

module.exports = {
	replaceText
};
 
function replaceText(string, replace = {}) {
    if (!string || !replace) return error(lang.errors["VALUE_IS_NOT_DEFINED"], {type: "replaceText"}, "replaceText('Hello {user}', {user: 'NewGlace'})");
    if (!(replace instanceof Object)) return error(lang.errors["VALUE_NOT_OBJECT"], {type: "replaceText"}, "replaceText('Hello {user}', {user: 'NewGlace'})");

    for (const [key, value] of Object.entries(replace)){
        const regexp = new RegExp(`{${key}}`, "g");
        string = string.replace(regexp, value);
    }

    return string;
}