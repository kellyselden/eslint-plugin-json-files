'use strict';

const processor = require('../../lib/processors/json');

// RuleTester doesn't allow preprocessors
function _preprocess(item) {
  item.code = processor.preprocess(item.code, item.filename)[0];
  return item;
}

function preprocess(tests) {
  for (let type of Object.keys(tests)) {
    tests[type] = tests[type].map(_preprocess);
  }
  return tests;
}

function applyAutofixWorkaround(ruleTester) {
  let { linter, linter: { verify } } = ruleTester;
  linter.verify = function(output, ...args) {
    if (!output.startsWith(processor._prefix)) {
      output = _preprocess({ code: output }).code;
    }
    return verify.call(this, output, ...args);
  };
  return ruleTester;
}

module.exports = preprocess;
module.exports.applyAutofixWorkaround = applyAutofixWorkaround;
