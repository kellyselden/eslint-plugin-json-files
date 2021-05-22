'use strict';

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/ensure-repository-directory');
const preprocess = require('../../helpers/preprocess');

new RuleTester().run('ensure-repository-directory', rule, preprocess({
  valid: [
    {
      code: '{ "repository": { "directory": "foo/bar" } }',
      filename: 'foo/bar/package.json'
    },
    {
      code: '{ "repository": { "directory": "bar/baz" } }',
      filename: 'foo/bar/baz/package.json'
    },
    {
      code: '{ "repository": "" }',
      filename: 'package.json'
    }
  ],
  invalid: [
    {
      code: '{ "repository": { "directory": "wrong/dir" } }',
      filename: 'foo/bar/package.json',
      errors: [{
        message: 'repository/directory does not match actual location.',
        type: 'Literal'
      }]
    },
    {
      code: '{ "repository": { "directory": "foo/bar/baz" } }',
      filename: 'bar/baz/package.json',
      errors: [{
        message: 'repository/directory does not match actual location.',
        type: 'Literal'
      }]
    },
    {
      code: '{ "repository": { "directory": "/foo/bar" } }',
      filename: 'wrong-root/foo/bar/package.json',
      errors: [{
        message: 'repository/directory does not match actual location.',
        type: 'Literal'
      }]
    }
  ]
}));
