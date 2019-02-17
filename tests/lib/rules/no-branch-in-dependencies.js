'use strict';

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/no-branch-in-dependencies');
const processor = require('../../../lib/processors/json');

// RuleTester doesn't allow preprocessors
function preprocess(item) {
  item.code = processor.preprocess(item.code, item.filename)[0];
  return item;
}

function fix(tests) {
  for (let type of Object.keys(tests)) {
    tests[type] = tests[type].map(preprocess);
  }
  return tests;
}

new RuleTester().run('no-branch-in-dependencies', rule, fix({
  valid: [
    {
      code: '{ "dependencies": { "lodash": "1.2.3" } }',
      filename: 'package.json'
    },
    {
      code: '{ "devDependencies": { "lodash": "1.2.3" } }',
      filename: 'package.json'
    },
    {
      code: '{ "optionalDependencies": { "lodash": "1.2.3" } }',
      filename: 'package.json'
    },
    {
      code: '{ "foo": { "lodash": "lodash/lodash" } }',
      filename: 'package.json'
    },
    {
      code: '{ "dependencies": { "lodash": "lodash/lodash" } }',
      filename: 'package.json',
      options: [{ keys: ['foo'] }]
    },
    {
      code: '{ "dependencies": { "lodash": "lodash/lodash" } }',
      filename: 'package.json',
      options: [{ exclude: ['lodash'] }]
    }
  ],
  invalid: [
    {
      code: '{ "dependencies": { "lodash": "lodash/lodash" } }',
      filename: 'package.json',
      errors: [{
        message: 'Don\'t use branches.',
        type: 'Literal'
      }]
    },
    {
      code: '{ "devDependencies": { "lodash": "lodash/lodash" } }',
      filename: 'package.json',
      errors: [{
        message: 'Don\'t use branches.',
        type: 'Literal'
      }]
    },
    {
      code: '{ "optionalDependencies": { "lodash": "lodash/lodash" } }',
      filename: 'package.json',
      errors: [{
        message: 'Don\'t use branches.',
        type: 'Literal'
      }]
    }
  ]
}));
