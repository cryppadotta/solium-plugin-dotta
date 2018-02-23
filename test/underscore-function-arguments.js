/**
 * @fileoverview Tests for no-unused-imports rule
 */

"use strict";

let fs = require("fs");
let rimraf = require("rimraf");
let Solium = require("solium");
let wrappers = require("./utils/wrappers");
let toContract = wrappers.toContract;

let userConfig = {
    rules: {
        "dotta/underscore-function-arguments": 1
    }
};

describe.only("[RULE] underscore-function-arguments: Rejections", function() {
    beforeEach(function(done) {
        fs.mkdir("test-tmp", done);
    });

    afterEach(function(done) {
        Solium.reset();

        rimraf("test-tmp", done);
    });

    it("should reject functions that don't use underscore arguments", function(done) {
        let code = toContract("function test_sum (a, _b) { return a + b; }"),
            errors = Solium.lint(code, userConfig);

        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(1);

        done();
    });
});
