'use strict';

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/validate-schema');
const preprocess = require('../../helpers/preprocess');
// const stripAnsi = require('strip-ansi');

function schema(json) {
  return JSON.stringify({
    '$schema': 'http://json-schema.org/draft-07/schema#',
    ...json
  });
}

function color(s) {
  // return process.stdout.isTTY ? s : stripAnsi(s);
  return s;
}

new RuleTester().run('validate-schema', rule, preprocess({
  valid: [
    {
      code: '{"foo":"bar"}',
      options: [{
        schema: schema({
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
        schema: schema({
          'type': 'object',
          'not': { 'required': ['foo'] }
        })
      }],
      errors: [{
        message: color(
          process.env.CI ?
            'NOT must NOT be valid\n\n\x1B[0m\x1B[31m\x1B[1m>\x1B[22m\x1B[39m\x1B[90m 1 |\x1B[39m {\x1B[32m"foo"\x1B[39m\x1B[33m:\x1B[39m\x1B[32m"bar"\x1B[39m}\n \x1B[90m   |\x1B[39m \x1B[31m\x1B[1m^\x1B[22m\x1B[39m\x1B[31m\x1B[1m^\x1B[22m\x1B[39m\x1B[31m\x1B[1m^\x1B[22m\x1B[39m\x1B[31m\x1B[1m^\x1B[22m\x1B[39m\x1B[31m\x1B[1m^\x1B[22m\x1B[39m\x1B[31m\x1B[1m^\x1B[22m\x1B[39m\x1B[31m\x1B[1m^\x1B[22m\x1B[39m\x1B[31m\x1B[1m^\x1B[22m\x1B[39m\x1B[31m\x1B[1m^\x1B[22m\x1B[39m\x1B[31m\x1B[1m^\x1B[22m\x1B[39m\x1B[31m\x1B[1m^\x1B[22m\x1B[39m\x1B[31m\x1B[1m^\x1B[22m\x1B[39m\x1B[31m\x1B[1m^\x1B[22m\x1B[39m \x1B[31m\x1B[1m👈🏽  not must NOT be valid\x1B[22m\x1B[39m\x1B[0m' :
            '\x1b[31m\x1b[1mNOT\x1b[22m\x1b[39m\x1b[31m must NOT be valid\x1b[39m\n\n\x1b[0m\x1b[31m\x1b[1m>\x1b[22m\x1b[39m\x1b[90m 1 |\x1b[39m {\x1b[32m"foo"\x1b[39m\x1b[33m:\x1b[39m\x1b[32m"bar"\x1b[39m}\n \x1b[90m   |\x1b[39m \x1b[31m\x1b[1m^\x1b[22m\x1b[39m\x1b[31m\x1b[1m^\x1b[22m\x1b[39m\x1b[31m\x1b[1m^\x1b[22m\x1b[39m\x1b[31m\x1b[1m^\x1b[22m\x1b[39m\x1b[31m\x1b[1m^\x1b[22m\x1b[39m\x1b[31m\x1b[1m^\x1b[22m\x1b[39m\x1b[31m\x1b[1m^\x1b[22m\x1b[39m\x1b[31m\x1b[1m^\x1b[22m\x1b[39m\x1b[31m\x1b[1m^\x1b[22m\x1b[39m\x1b[31m\x1b[1m^\x1b[22m\x1b[39m\x1b[31m\x1b[1m^\x1b[22m\x1b[39m\x1b[31m\x1b[1m^\x1b[22m\x1b[39m\x1b[31m\x1b[1m^\x1b[22m\x1b[39m \x1b[31m\x1b[1m👈🏽  \x1b[95mnot\x1b[31m must NOT be valid\x1b[22m\x1b[39m\x1b[0m'
        ),
        type: 'ObjectExpression'
      }],
      output: `{
  "foo": "bar"
}`
    },
    {
      code: '{"foo":"bar"}',
      options: [{
        schema: schema({
          'type': 'object',
          'not': { 'required': ['foo'] }
        }),
        prettyErrors: false
      }],
      errors: [{
        message: '#/not must NOT be valid',
        type: 'ObjectExpression'
      }],
      output: `{
  "foo": "bar"
}`
    },
    {
      code: '{"foo":"bar","bar":"foo"}',
      options: [{
        schema: schema({
          'type': 'object',
          'properties': {
            'foo': {
              'const': 'bar'
            }
          },
          'additionalProperties': false
        }),
        prettyErrors: false,
        avjFixerOptions: {
          removeAdditional: true
        }
      }],
      errors: [{
        message: '#/additionalProperties must NOT have additional properties',
        type: 'ObjectExpression'
      }],
      output: `{
  "foo": "bar"
}`
    }
  ]
}));
