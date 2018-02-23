/**
 * @fileoverview Disallow unused imports
 *
 * Thanks to the pseudocode by Raghav Dua.
 */

"use strict";

let fs = require("fs");
let solparse = require("solparse");

module.exports = {
    meta: {
        docs: {
            recommended: true,
            type: "error",
            description: "Disallow unused imports"
        },
        schema: []
    },

    create: function(context) {
        function inspectParameter(emitted, parameter) {
            if (parameter.type === "InformalParameter" && parameter.id) {
                if (parameter.id[0] != "_") {
                    context.report({
                        node: parameter,
                        message: `Function '${emitted.name}' parameter '${
                            parameter.id
                        }' does not start with an underscore`
                    });
                }
            }
        }

        function inspectFunctionDeclaration(emitted) {
            if (emitted.exit) {
                return;
            }
            const node = emitted.node;
            (node.params || []).forEach(param => inspectParameter(node, param));
        }

        return {
            FunctionDeclaration: inspectFunctionDeclaration
        };
    }
};
