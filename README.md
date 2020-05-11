# pseudo-translate

[![Node.js CI](https://github.com/rorsini/pseudo-translate-json/workflows/Node.js%20CI/badge.svg)](https://github.com/rorsini/pseudo-translate-json/actions?query=workflow%3A%22Node.js+CI%22)

A flexible utility to _pseudo-translate_ i18n resources
> → «Ä fléxïblé ütïlïty tö _pséüdö-třäñsläté_ ï18ñ řésöüřçés»

## Installation

Install using `npm`:
```bash
$ npm -i pseudo-translate
```

Then include `ptify` and use by passing in a JSON file path or JSON object containing your i18n resource strings to be pseudo-translated:
```javascript
const ptify = require('pseudo-translate');

const obj = {
    "USERS": {
        "MSG": "Welcome {{FNAME}} {{LNAME}}, nice to see you!"
    }
};

const pt = ptify(obj);

/*
  pt contains:

    {
        "USERS": {
            "MSG": "«Wélçömé {{FNAME}} {{LNAME}}, ñïçé tö séé yöü!»"
        }
    }
*/
```

## Configuration

Options include:

* Flexible variable interpolation syntax:

```json
{
  "MESSAGE_1": "«Héllö {{FIRST_NAME}} {{LAST_NAME}}, ωélçömé ïñ!»"
}
```

* Include Unicode "bookends" by default to identify string concatenation issues.

```json
{
    "BUTTON": {
        "SUBMIT": "«Sübmït»"
    }
}

```

## Keywords

[internationalization](https://www.npmjs.com/search?q=keywords:internationalization) [translation](https://www.npmjs.com/search?q=keywords:translation) [localization](https://www.npmjs.com/search?q=keywords:localization) [globalization](https://www.npmjs.com/search?q=keywords:globalization) [i18n](https://www.npmjs.com/search?q=keywords:i18n) [l10n](https://www.npmjs.com/search?q=keywords:l10n) [gettext](https://www.npmjs.com/search?q=keywords:gettext) [intl-messageformat](https://www.npmjs.com/search?q=keywords:intl-messageformat) [i18next](https://www.npmjs.com/search?q=keywords:i18next)
