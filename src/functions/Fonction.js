const {languageBuild, objectConstructor} = require("../structure");
const {error} = require("../errors/err");
const lang = languageBuild();

module.exports = {
    multiFunctions
};
 
async function multiFunctions(f, value, async = false) {
    if (!f || !value) return error(lang.errors["VALUE_IS_NOT_DEFINED"], {type: "multiFunctions"}, "multiFunctions(numberToRoman, [10, 30])");
    if (!(f instanceof Function)) return error(lang.errors["VALUE_NOT_FUNCTION"], {type: "multiFunctions"}, "multiFunctions(numberToRoman, [10, 30])");
    if (!(value instanceof Array)) return error(lang.errors["VALUE_NOT_ARRAY"], {type: "multiFunctions"}, "multiFunctions(numberToRoman, [10, 30])");
    if (typeof(async) !== "boolean") return error(lang.errors["VALUE_NOT_BOOLEAN"], {type: "multiFunctions"}, "multiFunctions(numberToRoman, [10, 30], true)");

    const results = [];
    for (let i = 0; i < value.length; i++) {
        if (async) {
            if (!(value[i] instanceof Array)) results.push(await f(value[i]??null))
            else results.push(await f(value[i][0]??null,value[i][1]??null,value[i][2]??null,value[i][3]??null,value[i][4]??null,value[i][5]??null))
        } else {
            if (!(value[i] instanceof Array)) results.push(f(value[i]))
            else results.push(f(value[i][0]??null,value[i][1]??null,value[i][2]??null,value[i][3]??null,value[i][4]??null,value[i][5]??null))
        }
    }

    return results;
}