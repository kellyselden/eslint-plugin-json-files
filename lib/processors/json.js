'use strict';

// const path = require('path');

const prefix = 'module.exports = ';

module.exports = {
  _prefix: prefix,
  preprocess(text/* , fileName */) {
    // if (path.basename(fileName) !== 'package.json') {
    //   return [];
    // }
    return [`${prefix}${text}`];
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
    }, []).map(message => {
      // message.fix.range refers to indices in the processed source text, so update them to refer to the correct
      // indices in the raw source text as documented here:
      // https://eslint.org/docs/developer-guide/working-with-plugins#processors-in-plugins
      return message.fix ? {
        ...message,
        fix: {
          ...message.fix,
          range: message.fix.range.map(rangePart => Math.max(0, rangePart - prefix.length))
        }
      } : message;
    });
  },
  supportsAutofix: true
};
