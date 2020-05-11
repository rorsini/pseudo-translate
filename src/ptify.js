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

const _randomProperty = (obj) => {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};

const _increaseLength = (str, options) => {
    if ( options &&
         options.increase_lengh_30_pct ) {
        for (let i=0; i < (str.length/100)*30/2; i++) {
            str += ` ${_randomProperty(CHARS)}`;
        }
    }
    return `${str}`;
};

const ptobj = (obj, options) => {
    if ( typeof obj === "object" ) {
        let retObj = {};
        for (let [key, value] of Object.entries(obj)) {
            retObj[key] = ptobj(value, options);
        }
        return retObj;
    } else if ( typeof obj === "string" ) {
        const val = _wrapSentence(
          _increaseLength(
            _processValue(obj),
            options
          )
        );
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

export default function ptify(enu_source, options) {
    if (typeof enu_source === "string") {
        if ( enu_source.endsWith(".json" ) ) {
            return ptobj(load_json(enu_source), options);
        } else {
            return ptobj(enu_source, options);
        }
    } else {
        return ptobj(enu_source, options);
    }
}
