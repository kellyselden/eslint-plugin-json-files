'use strict';

const path = require('path');

module.exports = {
  meta: {
    docs: {
      description: 'ensure repository/directory in package.json'
    },
    schema: [
    ]
  },

  create(context) {
    let filename = context.getFilename();
    if (path.basename(filename) !== 'package.json') {
      return {};
    }

    return {
      AssignmentExpression(node) {
        let json = node.right;
        let property = json.properties.find(p => p.key.value === 'repository');
        if (!property) {
          return;
        }
        let repository = property.value;
        if (repository.type !== 'ObjectExpression') {
          return;
        }
        property = repository.properties.find(p => p.key.value === 'directory');
        if (!property) {
          return;
        }
        let directory = property.value;
        let error = () => context.report({
          node: directory,
          message: 'repository/directory does not match actual location.'
        });
        let fake = directory.value;
        let real = path.dirname(filename);
        do {
          if (path.basename(fake) !== path.basename(real)) {
            error();
            break;
          }
          fake = path.dirname(fake);
          real = path.dirname(real);
        } while (fake !== '.' && real !== '.');
        if (fake !== '.' && real === '.') {
          error();
        }
      }
    };
  }
};
