'use strict';

const requireIndex = require('requireindex');
const path = require('path');
const { name, version } = require('../package.json');

module.exports.rules = requireIndex(path.join(__dirname, 'rules'));

// optional for our current use case but required if we ever want to use
// -cache and --print-config command line options.
// https://eslint.org/docs/latest/extend/plugin-migration-flat-config#adding-plugin-meta-information
module.exports.meta =  {
  name,
  version
},

module.exports.processors = {
  // .json is from previous versions, so we are leaving it in
  // for backward compatibility with < v9 eslint versions
  '.json': require('./processors/json'),
  // dot prefix is no longer allowed in eslint v9
  // https://eslint.org/docs/latest/extend/plugin-migration-flat-config#migrating-processors-for-flat-config
  'json': require('./processors/json')
};
