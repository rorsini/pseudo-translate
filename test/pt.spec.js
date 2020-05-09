var expect = require("chai").expect;
const jsonfile = require('jsonfile')
var { ptify } = require("../index.js");

const fixture = "./test/fixtures/en-us/main.json";
const enu_json = jsonfile.readFileSync(fixture);

//console.log(ptify.ptobj);

describe("Pseudo-Translate JSON:", function() {
    it("can translate a string", function() {
        const enu_obj = 'Please enter your email address.';
        const pt_obj = ptify.ptobj(enu_obj);
        expect(pt_obj).to.deep.equal('«Pléäsé éñtéř yöüř émäïl äddřéss.»');
    });

    it("can translate a simple JSON object", function() {
        const enu_obj = {
            EMAIL_PROMPT: 'Please enter your email address.'
        };
        const pt_obj = ptify.ptobj(enu_obj);
        expect(pt_obj).to.deep.equal({
            EMAIL_PROMPT: '«Pléäsé éñtéř yöüř émäïl äddřéss.»'
        });
    });

    it("can translate a JSON object with interpolation", function() {
        const enu_obj = {
            USER: {
                WELCOME: 'Welcome {{ USER }}, please have a look around!'
            }
        };
        const pt_obj = ptify.ptobj(enu_obj);
        expect(pt_obj).to.deep.equal({
            USER: {
                WELCOME: '«Wélçömé {{ USER }}, pléäsé hävé ä löök äřöüñd!»'
            }
        });
    });

    it("can handle multiple interpolation variables", function() {
        const enu_obj = 'Welcome {{ USER }}, please click {{ HERE }}';
        const pt_obj = ptify.ptobj(enu_obj);
        expect(pt_obj).to.deep.equal('«Wélçömé {{ USER }}, pléäsé çlïçk {{ HERE }}»');
    });

    it("can handle interpolation with and without whitespace", function() {
        const enu_obj = {
            USER: {
                WELCOME: 'Welcome {{ USER }}, please click {{HERE}}'
            }
        };
        const pt_obj = ptify.ptobj(enu_obj);
        expect(pt_obj).to.deep.equal({
            USER: {
                WELCOME: '«Wélçömé {{ USER }}, pléäsé çlïçk {{HERE}}»'
            }
        });
    });

    it.skip("can translate a directory of JSON files", function() {
    });

    it.skip("can handle a pluralization array", function() {
    });
});
