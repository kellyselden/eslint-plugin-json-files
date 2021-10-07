'use strict';

const path = require('path');

module.exports = {
  meta: {
    docs: {
      description: 'prevent duplicate packages in dependencies and devDependencies'
    },
    schema: [
    ],
    fixable: true
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

        for (let i = 0; i < devDependencies.value.properties.length; i++) {
          let devDep = devDependencies.value.properties[i];

          let dep = dependencies.value.properties.find(dep => dep.key.value === devDep.key.value);

          if (dep) {
            context.report({
              node: devDep.key,
              message: `Package ${devDep.key.raw} already shows up in ${dependencies.key.raw}.`,
              fix(fixer) {
                if (devDep.value.value === dep.value.value) {
                  let nextDevDep = devDependencies.value.properties[i + 1];
                  if (nextDevDep) {
                    return fixer.removeRange([devDep.range[0], nextDevDep.range[0]]);
                  }

                  let prevDevDep = devDependencies.value.properties[i - 1];
                  if (prevDevDep) {
                    return fixer.removeRange([prevDevDep.range[1], devDep.range[1]]);
                  }

                  return fixer.removeRange([
                    devDependencies.value.range[0] + 1,
                    devDependencies.value.range[1] - 1
                  ]);
                }
              }
            });
          }
        }
      }
    };
  }
};
