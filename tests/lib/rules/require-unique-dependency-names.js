'use strict';

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/require-unique-dependency-names');
const preprocess = require('../../helpers/preprocess');

new RuleTester().run('require-unique-dependency-names', rule, preprocess({
  valid: [
    {
      code: '{ "dependencies": { "foo": "0.0.0" }, "devDependencies": { "bar": "0.0.0" } }',
      filename: 'package.json',
    },
    // test no dependencies
    {
      code: '{ "devDependencies": { "foo": "0.0.0" } }',
      filename: 'package.json',
    },
    // test no devDependencies
    {
      code: '{ "dependencies": { "foo": "0.0.0" } }',
      filename: 'package.json',
    },
  ],
  invalid: [
    {
      code: '{ "dependencies": { "foo": "0.0.0" }, "devDependencies": { "foo": "0.0.0" } }',
      filename: 'package.json',
      errors: [{
        message: 'Package "foo" already shows up in "dependencies".',
        type: 'Literal',
      }],
      output: '{ "dependencies": { "foo": "0.0.0" }, "devDependencies": {} }',
    },
    {
      code: '{ "dependencies": { "foo": "0.0.0" }, "devDependencies": { "foo": "0.0.0", "bar": "0.0.0" } }',
      filename: 'package.json',
      errors: [{
        message: 'Package "foo" already shows up in "dependencies".',
        type: 'Literal',
      }],
      output: '{ "dependencies": { "foo": "0.0.0" }, "devDependencies": { "bar": "0.0.0" } }',
    },
    {
      code: '{ "dependencies": { "bar": "0.0.0" }, "devDependencies": { "foo": "0.0.0", "bar": "0.0.0" } }',
      filename: 'package.json',
      errors: [{
        message: 'Package "bar" already shows up in "dependencies".',
        type: 'Literal',
      }],
      output: '{ "dependencies": { "bar": "0.0.0" }, "devDependencies": { "foo": "0.0.0" } }',
    },
    // it doesn't autofix if different versions
    {
      code: '{ "dependencies": { "foo": "0.0.0" }, "devDependencies": { "foo": "1.0.0" } }',
      filename: 'package.json',
      errors: [{
        message: 'Package "foo" already shows up in "dependencies".',
        type: 'Literal',
      }],
    },
  ],
}));
