'use strict';

const path = require('path');

module.exports = {
  meta: {
    docs: {
      description: 'require a license in package.json'
    },
    schema: [
      {
        'enum': ['always', 'allow-unlicensed']
      }
    ]
  },

  create(context) {
    let filename = context.getFilename();
    if (path.basename(filename) !== 'package.json') {
      return {};
    }

    let allowUnlicensed = context.options[0] === 'allow-unlicensed';

    return {
      AssignmentExpression(node) {
        let json = node.right;
        let property = json.properties.find(p => p.key.value === 'license');
        if (!property) {
          context.report({
            node: json,
            message: 'Missing license.'
          });
          return;
        }
        let license = property.value;
        if (license.value === 'UNLICENSED' && !allowUnlicensed) {
          context.report({
            node: license,
            message: 'Missing license.'
          });
        }
      }
    };
  }
};
