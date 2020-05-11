# pseudo-translate

[![Node.js CI](https://github.com/rorsini/pseudo-translate-json/workflows/Node.js%20CI/badge.svg)](https://github.com/rorsini/pseudo-translate-json/actions?query=workflow%3A%22Node.js+CI%22)

A compact and flexible utility for pseudo-translating i18n resources.
> → «Ä çömpäçt äñd fléxïblé ütïlïty föř pséüdö-třäñslätïñg ï18ñ řésöüřçés.»

Pseudo-translation is defined as:
> *Pseudo-translation* is the process of mimicking the process of *translating* a
> file into another language. It is a dummy *translation* used to test if an
> application will function correctly in another language. So in plain English,
> it's a pretend *translation* used to test a process before the real *translation*
> begins.

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
```
where `pt` contains:
```
{
    "USERS": {
        "MSG": "«Wélçömé {{FNAME}} {{LNAME}}, ñïçé tö séé yöü!»"
    }
}
```
You can also pass in the path to your i18n resource JSON file:
```javascript
const pt = ptify('./locales/en-US.json');
```
which returns a object who's text values have been pseudo-translated.

## Configuration

Options include:

* Translations vary in length and your UI should be able to accommodate these
  variations. To increase the pseudo-translation length by approximately 30%,
  pass in the following `options` object:
  ```javascript
  const enu_obj = { MSG: 'Welcome {{ USER }}, please click {{HERE}}' };
  const options = {
      increase_lengh_30_pct: true
  };
  const pt = ptify(enu_obj, options);
  ```
  which results in:
  ```
  { MSG: '«Wélçömé {{ USER }}, pléäsé çlïçk {{HERE}} ω ä Ý Ä ñ ï»' }
  ```

* Unicode "bookends", e.g. `«` and `»`, are included by default to help
  identify string concatenation issues. For example:
  ```
  { "SUBMIT": "«Sübmït»" }
  ```
  To *disable* bookends, pass in the following option:
  ```javascript
  const enu_obj = { "SUBMIT": "Submit" };
  const options = {
      include_unicode_bookends: false
  };
  const pt = ptify(enu_obj, options);
  ```
  resulting in:
  ```
  { "SUBMIT": "Sübmït" }
  ```

## Issues

If you have any feature requests or bugs to report please add them here:
https://github.com/rorsini/pseudo-translate/issues

Thanks for your support!
