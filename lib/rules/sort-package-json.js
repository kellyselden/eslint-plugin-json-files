'use strict';

const path = require('path');
const sortPackageJson = require('sort-package-json');

module.exports = {
  meta: {
    docs: {
      description: 'enforce package.json sorting'
    },
    fixable: 'code',
    schema: [
    ]
  },

  create(context) {
    let filename = context.getFilename();
    if (path.basename(filename) !== 'package.json') {
      return {};
    }

    let sourceCode = context.getSourceCode();

    return {
      AssignmentExpression(node) {
        let packageJsonNode = node.right;
        let packageJsonText = sourceCode.text.substring(...packageJsonNode.range);
        let sortedText = sortPackageJson(packageJsonText);

        if (packageJsonText !== sortedText) {
          context.report({
            node: packageJsonNode,
            message: 'package.json is not sorted correctly.',
            fix(fixer) {
              return fixer.replaceText(packageJsonNode, sortedText);
            }
          });
        }
      }
    };
  }
};
