const jsonfile = require('jsonfile');

const CHARS = {
    'a':'ä', 'c':'ç', 'i':'ï', 'C':'Ç',
    'A':'Ä', 'e':'é', 'E':'É', 'D':'Ð',
    'o':'ö', 'O':'Ö', 'u':'ü', 'U':'Ü',
    'n':'ñ', 'r':'ř', 'Y':'Ý', 'w':'ω',
    'N':'Ñ'
};

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
    const words = str.replace(/({{)\s+(\S+)\s+(}})/g, "$1﹏$2﹏$3").split(/ +/g);
    let newWords = [];
    for (word in words) {
        const thisWord = words[word];
        const re = new RegExp(/{{.*}}/);
        if ( re.test(thisWord) ) {
            const repairSpace = thisWord.replace(/﹏/g, ' ');
            newWords.push(repairSpace);
        } else {
            newWords.push(_replaceChars(thisWord));
        }
    }
    return newWords.join(' ');
};

const _wrapSentence = (str) => {
    return `«${str}»`;
};

const ptobj = (obj) => {
    if ( typeof obj === "object" ) {
        let retObj = {};
        for (key in obj) {
            retObj[key] = ptobj(obj[key]);
        }
        return retObj;
    } else if ( typeof obj === "string" ) {
        const val = _wrapSentence(_processValue(obj));
        return val;
    }
};

const load_json = (dir) => {
    return jsonfile.readFileSync(dir);
};

exports.CHARS = CHARS;
exports._replaceChars = _replaceChars;
exports._processValue = _processValue;
exports._wrapSentence = _wrapSentence;
exports.ptobj = ptobj;
exports.load_json = load_json;

