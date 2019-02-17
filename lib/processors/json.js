'use strict';

// const path = require('path');

module.exports = {
  preprocess(text/* , fileName */) {
    // if (path.basename(fileName) !== 'package.json') {
    //   return [];
    // }
    return [`module.exports = ${text}`];
  },
  postprocess(messages/* , fileName */) {
    return messages.reduce((total, next) => {
      // return total.concat(next.filter(error => {
      //   return error.ruleId.startsWith('json-files/');
      // }));
      return total.concat(next);
    }, []);
  }
};
