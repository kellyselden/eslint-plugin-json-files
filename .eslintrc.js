module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017
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
      rules: {
        'mocha/no-exclusive-tests': 'error'
      }
    }
  ]
};
