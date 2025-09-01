'use strict';

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2022,
  },
  env: {
    es6: true,
  },
  extends: [
    'sane-node',
  ],
  overrides: [
    {
      files: [
        'tests/**/*.js',
      ],
      env: {
        mocha: true,
      },
      plugins: [
        'mocha',
      ],
      extends: [
        'plugin:mocha/recommended',
      ],
      rules: {
        'mocha/no-exclusive-tests': 'error',
        'mocha/no-empty-description': 'off',
      },
    },
  ],
};
