'use strict';

const path = require('path');

module.exports = {
  meta: {
    docs: {
      description: 'prevent duplicate packages in dependencies and devDependencies'
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

        let dependencies = json.properties.find(p => p.key.value === 'dependencies');
        if (!dependencies) {
          return;
        }

        let devDependencies = json.properties.find(p => p.key.value === 'devDependencies');
        if (!devDependencies) {
          return;
        }

        let deps = dependencies.value.properties.map(p => p.key.value);

        for (let p of devDependencies.value.properties) {
          if (deps.includes(p.key.value)) {
            context.report({
              node: p.key,
              message: `Package ${p.key.raw} already shows up in ${dependencies.key.raw}.`
            });
          }
        }
      }
    };
  }
};
