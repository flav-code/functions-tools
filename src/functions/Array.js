const {languageBuild, objectConstructor} = require("../structure");
const {error} = require("../errors/err");
const lang = languageBuild();

module.exports = {
    findArray,
    randomArray
};

function findArray(array, search, option = objectConstructor["findArray"]) {
    if (!array || !search) return error(lang.errors["VALUE_IS_NOT_DEFINED"], {type: "findArray"}, "findArray(['a','b','c'], 'a')");
    if (!(array instanceof Array)) return error(lang.errors["VALUE_NOT_ARRAY"], {type: "findArray"}, "findArray(['a','b','c'], 'a')");

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

function randomArray(a, option = objectConstructor["randomArray"]) {
    if (!a) return error(lang.errors["VALUE_IS_NOT_DEFINED"], {type: "randomArray"}, "randomArray(['a','b','c'])");
    if (!(a instanceof Array)) return error(lang.errors["VALUE_NOT_ARRAY"], {type: "randomArray"}, "randomArray(['a','b','c'])");
    if (!(option.number instanceof Number)) return error(lang.errors["VALUE_NOT_NUMBER"], {type: "randomArray"}, "randomArray(['a','b','c'], {number: 2})");
    if (!(option.double instanceof Boolean)) return error(lang.errors["VALUE_NOT_BOOLEAN"], {type: "randomArray"}, "randomArray(['a','b','c'], {double: true})");

    const randomList = [];
    const array = a.slice(0, a.length);

    for (let i = 0; i < option.number; i++) {
        if (array.length === 0) break;
        const random = Math.floor(Math.random() * array.length);
        randomList.push(array[random]);

        if (!option.double) {
            array.splice(random, 1);
        }
    }

    return randomList.length === 0 ? undefined : randomList.length === 1 ? randomList[0] : randomList;
}