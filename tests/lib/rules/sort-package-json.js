'use strict';

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/sort-package-json');
const preprocess = require('../../helpers/preprocess');

new RuleTester().run('sort-package-json', rule, preprocess({
  valid: [
    {
      code: '{ "name": "foo", "version": "1.0.0" }',
      filename: 'package.json'
    }
  ],
  invalid: [
    {
      code: '{ "version": "1.0.0", "name": "foo" }',
      filename: 'package.json',
      errors: [{
        message: 'package.json is not sorted correctly.',
        type: 'ObjectExpression'
      }]
    }
  ]
}));
