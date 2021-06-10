const {languageBuild, objectConstructor} = require("../structure");
const {error} = require("../errors/err");
const lang = languageBuild();

module.exports = {
    findArray
};

function findArray(array, search, option = objectConstructor["findArray"]) {
    if (!array || !search) return error(lang.errors["VALUE_IS_NOT_DEFINED"], {type: "find"}, "find(['a','b','c'], 'a')");
    if (!array instanceof Array) return error(lang.errors["VALUE_NOT_ARRAY"], {type: "find"}, "find(['a','b','c'], 'a')");

    let boolean = false;
    let findValue = new Map();

    findOneDimension(array);
    function findOneDimension(a, opt = false) {
        for (let i = 0; i < a.length; i++ ) {
            if (!opt) opt = "";
            if (boolean) break;
            if (a[i] instanceof Array) {
                opt += (opt.length === 0 ? "" : ";") + i;
                findOneDimension(a[i], opt);
            } else if (a[i] === search) {
                opt += (opt.length === 0 ? "" : ";") + i;
                const searchValue = opt.split(";").map(n => Number(n));
                findValue.set(findValue.size, searchValue);

                if (!option.all) {
                    boolean = true;
                }
            }
        }
    }
    return findValue;
}