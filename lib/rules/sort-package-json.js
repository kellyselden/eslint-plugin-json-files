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
        let packageJsonObject = JSON.parse(packageJsonText);
        let sortedObject = sortPackageJson(packageJsonObject);

        // `sortPackageJson` removes all whitespace
        // so normalize both (re-stringify ours)
        if (JSON.stringify(packageJsonObject) !== JSON.stringify(sortedObject)) {
          context.report({
            node: packageJsonNode,
            message: 'package.json is not sorted correctly.',
            fix(fixer) {
              let leadingWhitespace = sourceCode.text.substring(17, packageJsonNode.range[0]);
              let trailingWhitespace = sourceCode.text.substring(leadingWhitespace.length + packageJsonNode.range[1]);
              let sortedText = JSON.stringify(sortedObject, null, 2);
              return fixer.replaceText(node, `${leadingWhitespace}${sortedText}${trailingWhitespace}`);
            }
          });
        }
      }
    };
  }
};
