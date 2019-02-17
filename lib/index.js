'use strict';

const requireIndex = require('requireindex');
const path = require('path');

module.exports.rules = requireIndex(path.join(__dirname, 'rules'));

module.exports.processors = {
  '.json': require('./processors/json')
};
