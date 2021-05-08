'use strict';

const path = require('path');
const semver = require('semver');

const defaultDependencyTypes = [
  'dependencies',
  'devDependencies',
  'optionalDependencies'
];

const packages = {
  'packages': {
    'type': 'array',
    'items': {
      'type': 'string'
    }
  }
};
const packageRegex = {
  'packageRegex': {
    'type': 'string'
  }
};
const versionHint = {
  'versionHint': {
    'enum': [
      'caret',
      'tilde',
      'pin'
    ]
  }
};
const versionRegex = {
  'versionRegex': {
    'type': 'string'
  }
};
const pinUnstable = {
  'pinUnstable': {
    'type': 'boolean'
  }
};

let anyOf = [];

for (let prop1 of [packages, packageRegex]) {
  for (let prop2 of [versionHint, versionRegex, pinUnstable]) {
    anyOf.push(Object.assign({
      'type': 'object',
      'additionalProperties': false,
      'required': Object.keys(prop2)
    }, {
      'properties': Object.assign({
        'dependencyTypes': {
          'type': 'array',
          'items': {
            'type': 'string'
          }
        }
      }, prop1, prop2)
    }));
  }
}

function isUnstable(versionString) {
  if (semver.valid(versionString)) {
    // already pinned
    return;
  }

  let range;
  try {
    range = new semver.Range(versionString);
  } catch (err) {
    // something like a git url
    return;
  }

  // `` or `*`
  if (range.set[0][0].operator === '') {
    return;
  }

  let parsed = semver.minVersion(versionString);
  if (parsed.major === 0 || parsed.prerelease.length) {
    return true;
  }
}

module.exports = {
  meta: {
    docs: {
      description: 'prevent branches in package.json dependencies'
    },
    schema: [
      {
        'oneOf': [
          {
            anyOf
          },
          {
            'type': 'array',
            'items': {
              anyOf
            }
          }
        ]
      }
    ]
  },

  create(context) {
    let filename = context.getFilename();
    if (path.basename(filename) !== 'package.json' || !context.options[0]) {
      return {};
    }

    let optionsArray = Array.isArray(context.options[0]) ? context.options[0] : context.options;

    return {
      AssignmentExpression(node) {
        let json = node.right;
        for (let property of json.properties.filter(p => defaultDependencyTypes.includes(p.key.value))) {
          let deps = property.value;
          for (let p of deps.properties) {
            for (let options of optionsArray) {
              if (options.dependencyTypes && !options.dependencyTypes.includes(property.key.value)) {
                continue;
              }

              let packages = options.packages;
              let packageRegex = new RegExp(options.packageRegex === undefined ? '.*' : options.packageRegex);
              let versionHint = options.versionHint;
              let versionRegex = new RegExp(options.versionRegex === undefined ? '.*' : options.versionRegex);
              let pinUnstable = options.pinUnstable;

              let versionHintRegex;
              switch (versionHint) {
                case 'caret':
                  versionHintRegex = /^[\^~\d]/;
                  break;
                case 'tilde':
                  versionHintRegex = /^[~\d]/;
                  break;
                case 'pin':
                  versionHintRegex = /^\d/;
                  break;
                default:
                  versionHintRegex = /.*/;
              }

              let packageString = p.key.value;
              if (packages && !packages.includes(packageString)) {
                continue;
              }
              if (!packageRegex.test(packageString)) {
                continue;
              }

              let versionString = p.value.value;
              let failed;
              let message;
              if (!versionHintRegex.test(versionString)) {
                failed = true;
                message = `Invalid SemVer hint (${versionHint}).`;
              } else if (!versionRegex.test(versionString)) {
                failed = true;
                message = `Regex does not pass (${versionRegex}).`;
              } else if (pinUnstable && isUnstable(versionString)) {
                failed = true;
                message = 'Invalid SemVer hint on unstable.';
              }

              if (!failed) {
                break;
              }

              context.report({
                node: p.value,
                message
              });
            }
          }
        }
      }
    };
  }
};
