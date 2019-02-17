'use strict';

const path = require('path');
const semver = require('semver');

const defaultKeys = [
  'dependencies',
  'devDependencies',
  'optionalDependencies'
];

module.exports = {
  meta: {
    docs: {
      description: 'prevent branches in package.json dependencies'
    },
    schema: [
      {
        'type': 'object',
        'properties': {
          'keys': {
            'type': 'array',
            'items': {
              'type': 'string'
            }
          },
          'ignore': {
            'type': 'array',
            'items': {
              'type': 'string'
            }
          }
        },
        'additionalProperties': false
      }
    ]
  },

  create(context) {
    let filename = context.getFilename();
    if (path.basename(filename) !== 'package.json') {
      return {};
    }

    let options = context.options[0] || {};
    let keys = options.keys || defaultKeys;
    let ignore = options.ignore || [];

    return {
      AssignmentExpression(node) {
        let json = node.right;
        for (let property of json.properties.filter(p => keys.includes(p.key.value))) {
          let deps = property.value;
          for (let p of deps.properties.filter(p => !ignore.includes(p.key.value))) {
            if (semver.validRange(p.value.value)) {
              continue;
            }
            context.report({
              node: p.value,
              message: 'Don\'t use branches.'
            });
          }
        }
      }
    };
  }
};
