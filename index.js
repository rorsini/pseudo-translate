const jsonfile = require('jsonfile')

const CHARS = {
  'a':'ä', 'c':'ç', 'i':'ï', 'C':'Ç',
  'A':'Ä', 'e':'é', 'E':'É', 'D':'Ð',
  'o':'ö', 'O':'Ö', 'u':'ü', 'U':'Ü',
  'n':'ñ', 'r':'ř', 'Y':'Ý', 'w':'ω',
  'N':'Ñ'
}

const _replaceChars = (str) => {
  let retval = str;
  for (key in CHARS) {
    retval = retval.replace(
      RegExp(key, "g"),
      CHARS[key]
    );
  }
  return retval;
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

const pseudoTranslateObject = (obj) => {
  if ( typeof obj === "object" ) {
    let retObj = {};
    for (key in obj) {
      retObj[key] = pseudoTranslateObject(obj[key]);
    }
    return retObj;
  } else if ( typeof obj === "string" ) {
    const val = _wrapSentence(_processValue(obj));
    return val;
  }
};

const fileName = "./en-us/main.json";
const enu_json = jsonfile.readFileSync(fileName);
console.log(enu_json);
const pt_obj = pseudoTranslateObject(enu_json);
console.log(pt_obj);

// jsonfile.writeFileSync(fileName, content, { spaces: 2 })

