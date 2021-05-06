'use strict';

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/validate-schema');
const preprocess = require('../../helpers/preprocess');

new RuleTester().run('validate-schema', rule, preprocess({
  valid: [
    {
      code: '{"foo":"bar"}',
      filename: 'package.json',
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
      filename: 'package.json',
      options: [{
        schema: JSON.stringify({
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'type': 'object',
          'not': { 'required': ['foo'] }
        })
      }],
      errors: [{
        message: '#/not must NOT be valid',
        type: 'ObjectExpression'
      }]
    }
  ]
}));
