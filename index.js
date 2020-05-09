const jsonfile = require('jsonfile');
const ptify = require('./lib/ptify');

const fileName = "./test/fixtures/en-us/main.json";
const enu_json = jsonfile.readFileSync(fileName);
const pt_obj = ptify.ptobj(enu_json);

// jsonfile.writeFileSync(fileName, content, { spaces: 2 })
exports.ptify = ptify;
