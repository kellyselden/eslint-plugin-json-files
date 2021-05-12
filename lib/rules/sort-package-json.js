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
    let sourceCodeText = sourceCode.getText();

    return {
      AssignmentExpression(node) {
        let packageJsonNode = node.right;

        // When sorting the package.json text, also include any trailing whitespace because that whitespace will not be
        // included in the packageJsonNode
        let trailingWhitespace = /(\s*)$/.exec(sourceCodeText)[1];
        let packageJsonText = sourceCode.getText(packageJsonNode) + trailingWhitespace;
        let sortedText = sortPackageJson(packageJsonText);

        if (packageJsonText !== sortedText) {
          context.report({
            node: packageJsonNode,
            message: 'package.json is not sorted correctly.',
            fix(fixer) {
              // fixer.replaceText(node, ...) doesn't work because "node" never contains the trailing newline in the
              // original package.json. That newline won't get replaced, and we'll end up with an extra newline.
              // Instead, we have to replace the entire source code range.
              return fixer.replaceTextRange([0, sourceCodeText.length], sortedText);
            }
          });
        }
      }
    };
  }
};
