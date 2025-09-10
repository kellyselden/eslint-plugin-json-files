'use strict';

const {
  defineConfig,
} = require('eslint/config');

const config = require('@kellyselden/eslint-config');

module.exports = defineConfig([
  config,
  {
    ...config.find(c => c.name === 'mocha/recommended'),
    files: [
      'tests/**/*.js',
    ],
  },
]);
