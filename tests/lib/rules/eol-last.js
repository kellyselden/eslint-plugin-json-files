'use strict';

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/eol-last');
const preprocess = require('../../helpers/preprocess');

new RuleTester().run('eol-last', rule, preprocess({
  valid: [
    {
      code: `{}
`,
      filename: 'package.json'
    },
    {
      code: '{}',
      filename: 'package.json',
      options: ['never']
    }
  ],
  invalid: [
    {
      code: '{}',
      filename: 'package.json',
      errors: [{
        message: rule.meta.messages.missing,
        type: Object.keys(rule.create())[0]
      }],
      output: `{}
`
    },
    {
      code: `{}
`,
      filename: 'package.json',
      options: ['never'],
      errors: [{
        message: rule.meta.messages.unexpected,
        type: Object.keys(rule.create())[0]
      }],
      output: '{}'
    }
  ]
}));
