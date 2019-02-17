'use strict';

const path = require('path');

module.exports = {
  meta: {
    docs: {
      description: 'require a license in package.json'
    },
    schema: [
      {
        'enum': ['node-only', 'require-npm']
      }
    ]
  },

  create(context) {
    let filename = context.getFilename();
    if (path.basename(filename) !== 'package.json') {
      return {};
    }

    let requireNpm = context.options[0] === 'require-npm';

    return {
      AssignmentExpression(node) {
        let json = node.right;
        let property = json.properties.find(p => p.key.value === 'engines');
        if (!property) {
          context.report({
            node: json,
            message: 'Missing engines.'
          });
          return;
        }
        let engines = property.value;
        if (!engines.properties || !engines.properties.some(p => p.key.value === 'node')) {
          context.report({
            node: engines,
            message: 'Missing node engine.'
          });
          return;
        }
        if (requireNpm && !engines.properties.some(p => p.key.value === 'npm')) {
          context.report({
            node: engines,
            message: 'Missing npm engine.'
          });
        }
      }
    };
  }
};
