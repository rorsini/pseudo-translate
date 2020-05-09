const jsonfile = require('jsonfile');
const helpers = require('./lib/helpers');

const fileName = "./test/fixtures/en-us/main.json";
const enu_json = jsonfile.readFileSync(fileName);
const pt_obj = helpers.pseudoTranslate(enu_json);

console.log("name: ", helpers.name);


// jsonfile.writeFileSync(fileName, content, { spaces: 2 })

exports.pseudoTranslate = helpers.pseudoTranslate;
