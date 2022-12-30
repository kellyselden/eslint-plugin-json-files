'use strict';

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/validate-schema');
const preprocess = require('../../helpers/preprocess');
const stripAnsi = require('strip-ansi');

function color(s) {
  return process.stdout.isTTY ? s : stripAnsi(s);
}

new RuleTester().run('validate-schema', rule, preprocess({
  valid: [
    {
      code: '{"foo":"bar"}',
      options: [{
        schema: JSON.stringify({
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'type': 'object',
          'properties': {
            'foo': { 'type': 'string' }
          }
        })
      }]
    }
  ],
  invalid: [
    {
      code: '{"foo":"bar"}',
      options: [{
        schema: JSON.stringify({
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'type': 'object',
          'not': { 'required': ['foo'] }
        })
      }],
      errors: [{
        message: color('[31m[1mNOT[22m[39m[31m must NOT be valid[39m\n\n[0m[31m[1m>[22m[39m[90m 1 |[39m {[32m"foo"[39m[33m:[39m[32m"bar"[39m}[0m\n[0m [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m [31m[1m👈🏽  [95mnot[31m must NOT be valid[22m[39m[0m'),
        type: 'ObjectExpression'
      }]
    }
  ]
}));
