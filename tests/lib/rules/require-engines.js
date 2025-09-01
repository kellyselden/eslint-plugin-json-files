'use strict';

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/require-engines');
const preprocess = require('../../helpers/preprocess');

new RuleTester().run('require-engines', rule, preprocess({
  valid: [
    {
      code: '{ "engines": { "node": ">=8" } }',
      filename: 'package.json',
    },
    {
      code: '{ "engines": { "node": ">=8", "npm": ">=5" } }',
      filename: 'package.json',
      options: ['require-npm'],
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
        message: 'Missing engines.',
        type: 'ObjectExpression',
      }],
    },
    {
      code: '{ "engines": {} }',
      filename: 'package.json',
      errors: [{
        message: 'Missing node engine.',
        type: 'ObjectExpression',
      }],
    },
    {
      code: '{ "engines": { "node": ">=8" } }',
      filename: 'package.json',
      options: ['require-npm'],
      errors: [{
        message: 'Missing npm engine.',
        type: 'ObjectExpression',
      }],
    },
    {
      // doesn't error on unexpected engines
      code: '{ "engines": "" }',
      filename: 'package.json',
      errors: [{
        message: 'Missing node engine.',
        type: 'Literal',
      }],
    },
  ],
}));
