"use strict";

const path = require('path');
const semver = require('semver');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
      docs: {
          description: "Prevent branches in package.json dependencies",
          category: "Fill me in",
          recommended: false
      },
      fixable: null,  // or "code" or "whitespace"
      schema: [
          // fill in your schema
      ]
  },

  create(context) {
    let filename = context.getFilename();
    if (path.basename(filename) !== 'package.json') {
      return {};
    }
    console.log(path.basename(filename));
    return {

        // give me methods
        AssignmentExpression(node) {
          let obj = node.right;
          let devDependencies = obj.properties.find(p => p.key.value === 'devDependencies');
          if (devDependencies) {
            devDependencies = devDependencies.value;
            for (let p of devDependencies.properties) {
              semver.valid(p.value.value);
              if (!semver.validRange(p.value.value)) {
                context.report({
                  node: p.value,
                  message: 'Don\'t use branches.',
                });
              }
            }
          }
        }
    };
  }
};
