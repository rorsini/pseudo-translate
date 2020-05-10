<div align="center">
  <h1>:earth_africa: pseudo-translate → «pséüdö-třäñsläté» :earth_asia:</h1>
</div>


Pseudo-translate i18n resources

### Build Status: [![Node.js CI](https://github.com/rorsini/pseudo-translate-json/workflows/Node.js%20CI/badge.svg)](https://github.com/rorsini/pseudo-translate-json/actions?query=workflow%3A%22Node.js+CI%22)

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



