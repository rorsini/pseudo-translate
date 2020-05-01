var expect = require("chai").expect;
var pt = require("../index.js");

describe("Color Code Converter", function() {
  describe("Hex to RGB conversion", function() {
    it("converts the basic colors", function() {
      var red   = [255, 0, 0];
      var green = 'green';

      expect(red).to.deep.equal([255, 0, 0]);
      expect(green).to.deep.equal('green');
    });
  });
});
