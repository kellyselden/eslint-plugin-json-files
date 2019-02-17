/**
 * @fileoverview Prevent branches in package.json dependencies
 * @author Prevent branches in package.json dependencies
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-branch-in-dependencies"),

    RuleTester = require("eslint").RuleTester;

const { processors: { '.json': processor } } = require('../../../lib');


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

// RuleTester doesn't allow preprocessors
function preprocess(item) {
  item.code = processor.preprocess(item.code, item.filename)[0];
  return item;
}

var ruleTester = new RuleTester();
RuleTester.setDefaultConfig({
  // plugins: ["json-files"]
});
ruleTester.run("no-branch-in-dependencies", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
      preprocess({
            code: `{ "devDependencies": { "lodash": "lodash/lodash" } }`,
            filename: 'package.json',
            errors: [{
                message: "Don't use branches.",
                type: "Literal"
            }]
        })
    ]
});
