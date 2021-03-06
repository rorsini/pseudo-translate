# pseudo-translate

[![Node.js CI](https://github.com/rorsini/pseudo-translate-json/workflows/Node.js%20CI/badge.svg)](https://github.com/rorsini/pseudo-translate-json/actions?query=workflow%3A%22Node.js+CI%22)

A compact and flexible utility for **pseudo-translating** i18n resources.
> → «Ä çömpäçt äñd fléxïblé ütïlïty föř pséüdö-třäñslätïñg ï18ñ řésöüřçés.»

**Pseudo-translation** is the process of mimicking the actual translation of a
string into another language. It's a **readable**, dummy translation used to test if an
application will function correctly in another language.

Use it to:
* Verify that all UI text has been extracted into i18n resources.
  Pseudo-translation makes it easy to spot the strings you missed.
* Test that your UI can handle translations of varying length to avoid unintended
  word wrapping or truncation issues.
* Detect string concatenation issues in your UI before they break real
  translations. Leave language structure and word declension details to the
  translation experts.

Integrate this utility into your development process for quick feedback on
string-extractions while globalizing your software, or for periodic smoke
testing your localization workflow.

## Installation

Install using `npm`:
```bash
$ npm -i pseudo-translate
```

Then include `ptify` with:
```javascript
const ptify = require('pseudo-translate');
```

### Objects

Pseudo-translate a JSON object containing your i18n resource strings. Such as:
```javascript
const obj = {
    "USERS": {
        "MSG": "Welcome {{FNAME}} {{LNAME}}, nice to see you!"
    }
};
const pt = ptify(obj);
```
which results in `pt` containing:
```
{
    "USERS": {
        "MSG": "«Wélçömé {{FNAME}} {{LNAME}}, ñïçé tö séé yöü!»"
    }
}
```
Notice that the string interpolation place-holders `FNAME` and `LNAME` are left
un-touched so that your i18n extraction library's variable substitutions will
still work as expected. See:
https://www.i18next.com/translation-function/interpolation for details on the
default supported syntax.

### Files

Pseudo-translate an entire file by passing in the path to your i18n resource JSON file:
```javascript
const pt = ptify('./locales/en-US.json');
```
It returns a object who's text values have been pseudo-translated.

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
  To **disable** bookends, pass in the following option:
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
