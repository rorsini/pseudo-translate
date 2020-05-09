//import jsonfile from 'jsonfile';
import fs from 'fs';

const CHARS = {
    'a':'ä', 'c':'ç', 'i':'ï', 'C':'Ç',
    'A':'Ä', 'e':'é', 'E':'É', 'D':'Ð',
    'o':'ö', 'O':'Ö', 'u':'ü', 'U':'Ü',
    'n':'ñ', 'r':'ř', 'Y':'Ý', 'w':'ω',
    'N':'Ñ'
};

const _replaceChars = (str) => {
    for (let [key, value] of Object.entries(CHARS)) {
        str = str.replace(
            RegExp(key, "g"),
            value
        );
    }
    return str;
};

const _processValue = (str) => {
    const words = str.replace(/({{)\s+(\S+)\s+(}})/g, "$1﹏$2﹏$3").split(/ +/g);
    let newWords = words.map(word => {
        const re = new RegExp(/{{.*}}/);
        if ( re.test(word) ) {
            return word.replace(/﹏/g, ' ');
        } else {
            return _replaceChars(word);
        }
    });

    return newWords.join(' ');
};

const _wrapSentence = (str) => {
    return `«${str}»`;
};

const ptobj = (obj) => {
    if ( typeof obj === "object" ) {
        let retObj = {};
        for (let [key, value] of Object.entries(obj)) {
            retObj[key] = ptobj(value);
        }
        return retObj;
    } else if ( typeof obj === "string" ) {
        const val = _wrapSentence(_processValue(obj));
        return val;
    }
};

const load_json = (path) => {
    try {
        const data = fs.readFileSync(path, 'utf8')
        return JSON.parse(data);
    } catch (err) {
        console.error(err)
        return;
    }
};

export default function ptify(enu_source) {
    if (typeof enu_source === "string") {
        if ( enu_source.endsWith(".json" ) ) {
            return ptobj(load_json(enu_source));
        } else {
            return ptobj(enu_source);
        }
    } else {
        return ptobj(enu_source);
    }
}
