'use strict';

const path = require('path');

module.exports = {
  preprocess(text, fileName) {
    if (path.basename(fileName) === 'package.json') {
      return [`module.exports = ${text}`];
    }
    return [];
  },
  postprocess(messages) {
    return messages.reduce((total, next) => {
      return total.concat(next.filter(error => {
        return error.ruleId.startsWith('json/') || true;
      }));
    }, []);
  }
};
