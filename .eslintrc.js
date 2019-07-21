module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2018
  },
  env: {
    es6: true
  },
  extends: [
    'sane-node'
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
      extends: [
        'plugin:node/recommended'
      ]
    }
  ]
};
