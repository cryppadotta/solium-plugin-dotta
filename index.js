/**
 * @fileoverview Entry Point of Dotta's Solium plugin
 * @author Dotta <cryppadotta@protonmail.com>
 */

"use strict";

module.exports = {
    meta: {
        description: "Dotta's Solium plugin"
    },

    rules: {
        "underscore-function-arguments": require("./rules/underscore-function-arguments")
    }
};
