'use strict';

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/no-branch-in-dependencies');
const preprocess = require('../../helpers/preprocess');

new RuleTester().run('no-branch-in-dependencies', rule, preprocess({
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
      options: [{ ignore: ['lodash'] }]
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
