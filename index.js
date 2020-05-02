const jsonfile = require('jsonfile')

const CHARS = {
  'a':'ä', 'c':'ç', 'i':'ï', 'C':'Ç',
  'A':'Ä', 'e':'é', 'E':'É', 'D':'Ð',
  'o':'ö', 'O':'Ö', 'u':'ü', 'U':'Ü',
  'n':'ñ', 'r':'ř', 'Y':'Ý', 'w':'ω',
  'N':'Ñ'
}

const _replaceChars = (str) => {
  for (key in CHARS) {
    str = str.replace(
      RegExp(key, "g"),
      CHARS[key]
    );
  }
  return str;
};

const _processValue = (str) => {
  const words = str.split(/ +/g);
  let newWords = [];
  for (word in words) {
    const thisWord = words[word];
    const re = new RegExp(/{{.*}}/);
    if ( re.test(thisWord) ) {
      newWords.push(thisWord);
    } else {
      newWords.push(_replaceChars(thisWord));
    }
  }
  return newWords.join(' ');
};

const _wrapSentence = (str) => {
  return `«${str}»`;
};

const pseudoTranslate = (obj) => {
  if ( typeof obj === "object" ) {
    let retObj = {};
    for (key in obj) {
      retObj[key] = pseudoTranslate(obj[key]);
    }
    return retObj;
  } else if ( typeof obj === "string" ) {
    const val = _wrapSentence(_processValue(obj));
    return val;
  }
};

const fileName = "./test/fixtures/en-us/main.json";
const enu_json = jsonfile.readFileSync(fileName);
const pt_obj = pseudoTranslate(enu_json);

// jsonfile.writeFileSync(fileName, content, { spaces: 2 })

exports.pseudoTranslate = pseudoTranslate;