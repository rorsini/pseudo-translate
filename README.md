# pseudo-translate

A powerful utility to _pseudo-translate_ i18n resources
> → «Ä pöωéřfül ütïlïty tö _pséüdö-třäñsläté_ ï18ñ řésöüřçés»


## Build status

[![Node.js CI](https://github.com/rorsini/pseudo-translate-json/workflows/Node.js%20CI/badge.svg)](https://github.com/rorsini/pseudo-translate-json/actions?query=workflow%3A%22Node.js+CI%22)

## Installation

First, run:
```bash
$ npm i pseudo-translate
```

Then require, and use like this:
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


