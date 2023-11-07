'use strict';

const path = require('path');
const sortPackageJson = require('sort-package-json');

module.exports = {
  meta: {
    docs: {
      description: 'Enforce package.json sorting'
    },
    fixable: 'code',
    schema: [{
      type: 'object',
      properties: {
        sortOrder: {
          type: 'array',
          minItems: 0,
          items: {
            type: 'string'
          }
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    let filename = context.getFilename();
    if (path.basename(filename) !== 'package.json') {
      return {};
    }

    let sourceCode = context.getSourceCode();
    let options = context.options ? context.options[0] : undefined;

    return {
      AssignmentExpression(node) {
        let packageJsonNode = node.right;
        let packageJsonText = sourceCode.text.substring(...packageJsonNode.range);
        let sortedText = sortPackageJson(packageJsonText, options);

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
