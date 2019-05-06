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
      // disable js rules running on json files
      // this becomes too noisey, and splitting js and json
      // into separate overrides so neither inherit the other
      // is lame
      // revisit once https://github.com/eslint/rfcs/pull/9 lands
      // return total.concat(next);

      return total.concat(next.filter(error => {
        return error.ruleId && error.ruleId.startsWith('json-files/');
      }));
    }, []);
  },
  supportsAutofix: true
};
