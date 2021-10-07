'use strict';

const processor = require('../../lib/processors/json');

// RuleTester doesn't allow preprocessors
function _preprocess(item) {
  item.code = processor.preprocess(item.code, item.filename)[0];
  if (item.output) {
    item.output = processor.preprocess(item.output, item.filename)[0];
  }
  return item;
}

function preprocess(tests) {
  for (let type of Object.keys(tests)) {
    tests[type] = tests[type].map(_preprocess);
  }
  return tests;
}

module.exports = preprocess;
