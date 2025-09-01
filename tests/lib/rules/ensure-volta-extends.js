'use strict';

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/ensure-volta-extends');
const preprocess = require('../../helpers/preprocess');
const path = require('path');

new RuleTester().run('ensure-volta-extends', rule, preprocess({
  valid: [
    {
      code: '{}',
      filename: path.join(__dirname, 'package.json'),
    },
    {
      code: '{ "volta": "" }',
      filename: path.join(__dirname, 'package.json'),
    },
    {
      code: '{ "volta": {} }',
      filename: path.join(__dirname, 'package.json'),
    },
    {
      code: '{ "volta": { "extends": {} } }',
      filename: path.join(__dirname, 'package.json'),
    },
    {
      code: '{ "volta": { "extends": "../../fixtures/volta/with-volta.json" } }',
      filename: path.join(__dirname, 'package.json'),
    },
  ],
  invalid: [
    {
      code: '{ "volta": { "extends": "wrong/dir" } }',
      filename: path.join(__dirname, 'package.json'),
      errors: [{
        message: 'volta/extends \'wrong/dir\' does not exist.',
        type: 'Literal',
      }],
    },
    {
      code: '{ "volta": { "extends": "../../fixtures/volta/not-json.js" } }',
      filename: path.join(__dirname, 'package.json'),
      errors: [{
        message: 'volta/extends \'../../fixtures/volta/not-json.js\' is not JSON.',
        type: 'Literal',
      }],
    },
    {
      code: '{ "volta": { "extends": "../../fixtures/volta/no-volta.json" } }',
      filename: path.join(__dirname, 'package.json'),
      errors: [{
        message: 'volta/extends \'../../fixtures/volta/no-volta.json\' does not have a volta config.',
        type: 'Literal',
      }],
    },
  ],
}));
