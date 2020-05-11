var expect = require("chai").expect;

var ptify = require("..");


describe("Pseudo-Translate JSON:", function() {
    it("can translate a string", function() {
        const enu_obj = 'Please enter your email address.';
        const pt_obj = ptify(enu_obj);
        expect(pt_obj).to.deep.equal('«Pléäsé éñtéř yöüř émäïl äddřéss.»');
    });

    it("can translate a simple JSON object", function() {
        const enu_obj = {
            EMAIL_PROMPT: 'Please enter your email address.'
        };
        const pt_obj = ptify(enu_obj);
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
        const pt_obj = ptify(enu_obj);
        expect(pt_obj).to.deep.equal({
            USER: {
                WELCOME: '«Wélçömé {{ USER }}, pléäsé hävé ä löök äřöüñd!»'
            }
        });
    });

    it("can handle multiple interpolation variables", function() {
        const enu_obj = 'Welcome {{ USER }}, please click {{ HERE }}';
        const pt_obj = ptify(enu_obj);
        expect(pt_obj).to.deep.equal('«Wélçömé {{ USER }}, pléäsé çlïçk {{ HERE }}»');
    });

    it("can handle interpolation with and without whitespace", function() {
        const enu_obj = {
            USER: {
                WELCOME: 'Welcome {{ USER }}, please click {{HERE}}'
            }
        };
        const pt_obj = ptify(enu_obj);
        expect(pt_obj).to.deep.equal({
            USER: {
                WELCOME: '«Wélçömé {{ USER }}, pléäsé çlïçk {{HERE}}»'
            }
        });
    });

    it("can translate a JSON file", function() {
        const pt_obj = ptify('./test/fixtures/en-us/main.json');
        expect(pt_obj).to.deep.equal({
            "EMAIL_PROMPT": "«Pléäsé éñtéř yöüř émäïl äddřéss.»",
            "USER": {
                "WELCOME": "«Wélçömé {{USER}}, pléäsé hävé ä löök äřöüñd!»"
            }
        });
    });

    it("takes an option to increase translation length by ~30%", function() {
        const testData = [
            { MSG: 'Welcome!' },
            { MSG: 'Welcome {{ USER }}, please click {{HERE}}' },
            { MSG: 'One two three four five six seven eight nine ten. One two three four five six seven eight nine ten.' }
        ];
        testData.map((enu_obj) => {
            const options = {
              increase_lengh_30_pct: true
            };
            const pt_obj = ptify(enu_obj, options);
            const thirtyPctLonger = enu_obj['MSG'].length + Math.floor(enu_obj['MSG'].length/100*30);
            expect(pt_obj['MSG'].length).to.be.approximately(thirtyPctLonger, 3);
        })
    });

    it("takes an option to disable adding unicode bookends", function() {
        const enu_obj = { MSG: 'Welcome {{ USER }}, please click {{HERE}}' };
        const options = {
            include_unicode_bookends: false
        };
        const pt_obj = ptify(enu_obj, options);
        console.log(pt_obj);
        expect(pt_obj).to.deep.equal({
            MSG: 'Wélçömé {{ USER }}, pléäsé çlïçk {{HERE}}'
        });
    });

    it.skip("can translate a directory of JSON files", function() {
        //TODO:  jsonfile.writeFileSync(fileName, content, { spaces: 2 })
    });

    it.skip("can handle a pluralization array", function() {
    });
});
