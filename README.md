# :earth_africa: pseudo-translate → «pséüdö-třäñsläté» :earth_asia:

A powerful utility to _pseudo-translate_ i18n resources
  → «Ä pöωéřfül ütïlïty tö _pséüdö-třäñsläté_ ï18ñ řésöüřçés»

[![Node.js CI](https://github.com/rorsini/pseudo-translate-json/workflows/Node.js%20CI/badge.svg)](https://github.com/rorsini/pseudo-translate-json/actions?query=workflow%3A%22Node.js+CI%22)

## Installation

`npm i pseudo-translate`

```javascript
const ptify = require('pseudo-translate');

const obj = {
  "USERS": {
    "MSG": "Welcome {{FNAME}} {{LNAME}}, nice to see you!"
  }
};

console.log(ptify(obj))

// outputs:
// {
//   USERS: {
//     MSG: '«Wélçömé {{FNAME}} {{LNAME}}, ñïçé tö séé yöü!»'
//   }
// }
```


## Configuration Options

Options include:

* Flexible variable interpolation syntax. `"MESSAGE_1": "Hello {{FIRST_NAME}} {{LAST_NAME}}, welcome in!"`

* Include Unicode "bookends" by default to identify string concatenation issues.



