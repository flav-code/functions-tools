const {languageBuild, objectConstructor} = require("../structure");
const {error} = require("../errors/err");
const lang = languageBuild();

module.exports = {
	numberToRoman,
    romanToNumber
};
const numbers = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
const romans = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I",];
const romansLength = ["CM", "CD", "XC", "XL", "IX", "IV", "M", "D", "C", "L", "X", "V", "I"];

function numberToRoman(number) {
    if (!number) return error(lang.errors["VALUE_IS_NOT_DEFINED"], {type: "numberToRoman"}, "numberToRoman(24)");
    if (typeof(number) !== "number") return error(lang.errors["VALUE_NOT_NUMBER"], {type: "numberToRoman"}, "numberToRoman(24)");
   
    let romansText = ""; 
    for (let i = 0; i < numbers.length; i++) {
        const num = Math.floor(number / numbers[i]);
        romansText += romans[i].repeat(num);
        number -= (numbers[i] * num);
    }
    
    return romansText;
}

function romanToNumber(roman) {
    if (!roman) return error(lang.errors["VALUE_IS_NOT_DEFINED"], {type: "romanToNumber"}, "romanToNumber('XXIV')");
    if (typeof(roman) !== "string") return error(lang.errors["VALUE_NOT_STRING"], {type: "romanToNumber"}, "romanToNumber('XXIV')");
  
    let number = 0; 
    for (let i = 0; i < romansLength.length; i++) {
        const char = romansLength[i];
        while(roman.includes(char)) {
            roman = roman.replace(char);
            number += numbers[romans.indexOf(char)];
        }
    }

    return number;
}