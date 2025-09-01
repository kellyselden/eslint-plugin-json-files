'use strict';

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/require-license');
const preprocess = require('../../helpers/preprocess');

new RuleTester().run('require-license', rule, preprocess({
  valid: [
    {
      code: '{ "license": "MIT" }',
      filename: 'package.json',
    },
    {
      code: '{ "license": "UNLICENSED" }',
      filename: 'package.json',
      options: ['allow-unlicensed'],
    },
    {
      code: '{}',
      filename: 'not-package.json',
    },
  ],
  invalid: [
    {
      code: '{}',
      filename: 'package.json',
      errors: [{
        message: 'Missing license.',
        type: 'ObjectExpression',
      }],
    },
    {
      code: '{ "license": "UNLICENSED" }',
      filename: 'package.json',
      errors: [{
        message: 'Missing license.',
        type: 'Literal',
      }],
    },
  ],
}));
