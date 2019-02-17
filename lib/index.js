"use strict";

const path = require('path');

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");

module.exports.processors = {
  ".json": {
    preprocess: function(text, fileName) {
      if (path.basename(fileName) === 'package.json') {
        return [`module.exports = ${text}`];
      }
      return [];
    },
    postprocess: function(messages, fileName) {
      // console.log(messages);
      return messages.reduce((total, next) => {
        return total.concat(next.filter(error => {
          return error.ruleId.startsWith('json/') || true;
        }));
      }, []);
    }
  }
};

