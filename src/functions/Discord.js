const {languageBuild, objectConstructor} = require("../structure.js");
const lang = languageBuild();

let client = null;

module.exports = {
    updateClient
};

function updateClient(c) {
    client = c;
}
 