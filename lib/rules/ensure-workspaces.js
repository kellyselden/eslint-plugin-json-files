'use strict';

const path = require('path');
const fg = require('fast-glob');

module.exports = {
  meta: {
    docs: {
      description: 'ensure workspace globs in package.json resolve to directories',
    },
    schema: [
    ],
  },

  create(context) {
    let filename = context.getFilename();
    if (path.basename(filename) !== 'package.json') {
      return {};
    }

    return {
      AssignmentExpression(node) {
        let json = node.right;
        let property = json.properties.find(p => p.key.value === 'workspaces');
        if (!property) {
          return;
        }

        let workspaces = property.value;
        if (workspaces.type === 'ObjectExpression') {
          let property = workspaces.properties.find(p => p.key.value === 'packages');
          if (!property) {
            return;
          }

          workspaces = property.value;
        }

        if (workspaces.type !== 'ArrayExpression') {
          return;
        }

        for (let node of workspaces.elements) {
          if (node.type !== 'Literal') {
            continue;
          }

          if (typeof node.value !== 'string') {
            continue;
          }

          // fast-glob isn't handling windows paths
          let _path = path.posix;

          let glob = _path.join(node.value, 'package.json');

          let entries = fg.sync(glob, {
            cwd: path.dirname(filename),
          });

          if (!entries.length) {
            context.report({
              node,
              message: 'workspace path/glob does not match any workspaces with a package.json.',
            });
          }
        }
      },
    };
  },
};
