'use strict';

const processor = require('../../lib/processors/json');

// RuleTester doesn't allow preprocessors
function preprocess(item) {
  item.code = processor.preprocess(item.code, item.filename)[0];
  return item;
}

module.exports = function fix(tests) {
  for (let type of Object.keys(tests)) {
    tests[type] = tests[type].map(preprocess);
  }
  return tests;
};
