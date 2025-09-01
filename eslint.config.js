'use strict';

const {
  defineConfig,
  globalIgnores,
} = require('eslint/config');

const mocha = require('eslint-plugin-mocha');
const saneNode = require('eslint-config-sane-node');

module.exports = defineConfig([
  saneNode,
  {
    ...mocha.configs.flat.recommended,
    files: [
      'test/**/*-test.js',
    ],
    rules: {
      ...mocha.configs.flat.recommended.rules,
      'mocha/no-exclusive-tests': 'error',
      'mocha/no-empty-description': 'off',
    },
  },
  globalIgnores([
    'test/fixtures/',
  ]),
]);
