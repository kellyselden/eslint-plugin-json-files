'use strict';

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/no-branch-in-dependencies');

const { processors: { '.json': processor } } = require('../../../lib');

// RuleTester doesn't allow preprocessors
function preprocess(item) {
  item.code = processor.preprocess(item.code, item.filename)[0];
  return item;
}

new RuleTester().run('no-branch-in-dependencies', rule, {
  valid: [

    // give me some code that won't trigger a warning
  ],
  invalid: [
    preprocess({
      code: '{ "devDependencies": { "lodash": "lodash/lodash" } }',
      filename: 'package.json',
      errors: [{
        message: 'Don\'t use branches.',
        type: 'Literal'
      }]
    })
  ]
});
