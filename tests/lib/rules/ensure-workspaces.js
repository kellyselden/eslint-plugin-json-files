'use strict';

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/ensure-workspaces');
const preprocess = require('../../helpers/preprocess');

new RuleTester().run('ensure-workspaces', rule, preprocess({
  valid: [
    {
      code: '{ "workspaces": ["tests/fixtures/workspaces/*/bar"] }'
    },
    {
      code: '{}',
      filename: 'package.json'
    },
    {
      code: '{ "workspaces": "literal" }',
      filename: 'package.json'
    },
    {
      code: '{ "workspaces": [{}] }',
      filename: 'package.json'
    },
    {
      code: '{ "workspaces": [0] }',
      filename: 'package.json'
    },
    {
      code: '{ "workspaces": ["tests/fixtures/workspaces/*/bar"] }',
      filename: 'package.json'
    },
    {
      code: '{ "workspaces": ["tests/fixtures/workspaces/*/bar"] }',
      filename: 'package.json'
    },
    {
      code: '{ "workspaces": {} }',
      filename: 'package.json'
    },
    {
      code: '{ "workspaces": { "packages": "literal" } }',
      filename: 'package.json'
    },
    {
      code: '{ "workspaces": { "packages": [{}] } }',
      filename: 'package.json'
    },
    {
      code: '{ "workspaces": { "packages": [0] } }',
      filename: 'package.json'
    },
    {
      code: '{ "workspaces": { "packages": ["tests/fixtures/workspaces/*/bar"] } }',
      filename: 'package.json'
    }
  ],
  invalid: [
    {
      code: '{ "workspaces": ["tests/fixtures/workspaces/*/baz"] }',
      filename: 'package.json',
      errors: [{
        message: 'workspace path/glob does not match any workspaces with a package.json.',
        type: 'Literal'
      }]
    },
    {
      code: '{ "workspaces": { "packages": ["tests/fixtures/workspaces/*/baz"] } }',
      filename: 'package.json',
      errors: [{
        message: 'workspace path/glob does not match any workspaces with a package.json.',
        type: 'Literal'
      }]
    }
  ]
}));
