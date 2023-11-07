'use strict';

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/sort-package-json');
const preprocess = require('../../helpers/preprocess');

new RuleTester().run('sort-package-json', rule, preprocess({
  valid: [
    {
      code: '{"name":"foo","version":"1.0.0"}',
      filename: 'package.json'
    }
  ],
  invalid: [
    {
      code: '{"version":"1.0.0","name":"foo"}',
      filename: 'package.json',
      errors: [{
        message: 'package.json is not sorted correctly.',
        type: 'ObjectExpression'
      }],
      output: '{"name":"foo","version":"1.0.0"}'
    },
    // preserves trailing whitespace
    {
      code: `{
  "version": "1.0.0",
  "name": "foo"
}
`,
      filename: 'package.json',
      errors: [{
        message: 'package.json is not sorted correctly.',
        type: 'ObjectExpression'
      }],
      output: `{
  "name": "foo",
  "version": "1.0.0"
}
`
    },
    // preserves existing indentation
    {
      code: `{
    "version": "1.0.0",
    "name": "foo"
}`,
      filename: 'package.json',
      errors: [{
        message: 'package.json is not sorted correctly.',
        type: 'ObjectExpression'
      }],
      output: `{
    "name": "foo",
    "version": "1.0.0"
}`
    },
    // accepts and uses options
    {
      code: '{"version":"1.0.0","name":"foo","license":"UNLICENSED"}',
      filename: 'package.json',
      options: [{ sortOrder: ['license', 'name'] }],
      errors: [{
        message: 'package.json is not sorted correctly.',
        type: 'ObjectExpression'
      }],
      output: '{"license":"UNLICENSED","name":"foo","version":"1.0.0"}'
    },
    // accepts and uses options, uses different sort order
    {
      code: '{"version":"1.0.0","name":"foo","license":"UNLICENSED"}',
      filename: 'package.json',
      options: [{ sortOrder: ['name', 'license'] }],
      errors: [{
        message: 'package.json is not sorted correctly.',
        type: 'ObjectExpression'
      }],
      output: '{"name":"foo","license":"UNLICENSED","version":"1.0.0"}'
    }
  ]
}));
