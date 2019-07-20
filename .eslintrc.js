module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2018
  },
  env: {
    es6: true,
    node: true
  },
  plugins: [
    'node'
  ],
  extends: [
    'sane',
    'plugin:node/recommended'
  ],
  rules: {
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      env: {
        mocha: true
      },
      plugins: [
        'mocha'
      ],
      rules: Object.assign({}, require('eslint-plugin-mocha').configs.recommended.rules, {
        // add your custom rules and overrides for node files here
      })
    }
  ]
};
