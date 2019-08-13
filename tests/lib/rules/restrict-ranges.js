'use strict';

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/restrict-ranges');
const preprocess = require('../../helpers/preprocess');

new RuleTester().run('restrict-ranges', rule, preprocess({
  valid: [
    // no options
    {
      code: '{ "dependencies": { "foo": "^1.2.3" } }',
      filename: 'package.json'
    },
    ...[ // versionHint
      {
        code: '{ "dependencies": { "foo": "^1.2.3" } }',
        filename: 'package.json',
        options: [{ versionHint: 'carat' }]
      },
      {
        code: '{ "dependencies": { "foo": "~1.2.3" } }',
        filename: 'package.json',
        options: [{ versionHint: 'carat' }]
      },
      {
        code: '{ "dependencies": { "foo": "1.2.3" } }',
        filename: 'package.json',
        options: [{ versionHint: 'carat' }]
      },
      {
        code: '{ "dependencies": { "foo": "~1.2.3" } }',
        filename: 'package.json',
        options: [{ versionHint: 'tilde' }]
      },
      {
        code: '{ "dependencies": { "foo": "1.2.3" } }',
        filename: 'package.json',
        options: [{ versionHint: 'tilde' }]
      },
      {
        code: '{ "dependencies": { "foo": "1.2.3" } }',
        filename: 'package.json',
        options: [{ versionHint: 'pin' }]
      }
    ],
    ...[ // versionRegex
      {
        code: '{ "dependencies": { "foo": "^1.2.3" } }',
        filename: 'package.json',
        options: [{ versionRegex: '^' }]
      }
    ],
    ...[ // dependencyTypes
      {
        code: '{ "dependencies": { "foo": "1.2.3" }, "devDependencies": { "bar": "^1.2.3" } }',
        filename: 'package.json',
        options: [{ dependencyTypes: ['dependencies'], versionHint: 'pin' }]
      }
    ],
    ...[ // packages
      {
        code: '{ "dependencies": { "foo": "1.2.3", "bar": "^1.2.3" } }',
        filename: 'package.json',
        options: [{ packages: ['foo'], versionHint: 'pin' }]
      }
    ],
    ...[ // packageRegex
      {
        code: '{ "dependencies": { "foo": "1.2.3", "bar": "^1.2.3" } }',
        filename: 'package.json',
        options: [{ packageRegex: 'foo', versionHint: 'pin' }]
      }
    ],
    ...[ // grouping
      {
        code: '{ "dependencies": { "foo": "1.2.3", "bar": "^1.2.3" } }',
        filename: 'package.json',
        options: [[
          { packages: ['foo'], versionHint: 'pin' },
          { packageRegex: 'foo', versionHint: 'pin' }
        ]]
      },
      // stop searching on first match
      {
        code: '{ "dependencies": { "foo": "^1.2.3" } }',
        filename: 'package.json',
        options: [[
          { versionRegex: '^' },
          { versionRegex: '~' }
        ]]
      }
    ],
    ...[ // pinUnstable
      {
        code: '{ "dependencies": { "foo": "0.1.2", "bar": "^1.2.3" } }',
        filename: 'package.json',
        options: [{ pinUnstable: true }]
      },
      {
        code: '{ "dependencies": { "foo": "1.2.3-alpha.0", "bar": "^1.2.3" } }',
        filename: 'package.json',
        options: [{ pinUnstable: true }]
      }
    ]
  ],
  invalid: [
    ...[ // versionHint
      {
        code: '{ "dependencies": { "foo": "^1.2.3" } }',
        filename: 'package.json',
        options: [{ versionHint: 'tilde' }],
        errors: [{
          message: 'Invalid SemVer hint (tilde).',
          type: 'Literal'
        }]
      },
      {
        code: '{ "dependencies": { "foo": "~1.2.3" } }',
        filename: 'package.json',
        options: [{ versionHint: 'pin' }],
        errors: [{
          message: 'Invalid SemVer hint (pin).',
          type: 'Literal'
        }]
      },
      {
        code: '{ "dependencies": { "foo": "^1.2.3" } }',
        filename: 'package.json',
        options: [{ versionHint: 'pin' }],
        errors: [{
          message: 'Invalid SemVer hint (pin).',
          type: 'Literal'
        }]
      }
    ],
    ...[ // versionRegex
      {
        code: '{ "dependencies": { "foo": "^1.2.3" } }',
        filename: 'package.json',
        options: [{ versionRegex: '~' }],
        errors: [{
          message: 'Regex does not pass (/~/).',
          type: 'Literal'
        }]
      }
    ],
    ...[ // dependencyTypes
      {
        code: '{ "dependencies": { "foo": "^1.2.3" }, "devDependencies": { "bar": "^1.2.3" } }',
        filename: 'package.json',
        options: [{ dependencyTypes: ['dependencies'], versionHint: 'pin' }],
        errors: [{
          message: 'Invalid SemVer hint (pin).',
          type: 'Literal'
        }]
      }
    ],
    ...[ // packages
      {
        code: '{ "dependencies": { "foo": "^1.2.3", "bar": "^1.2.3" } }',
        filename: 'package.json',
        options: [{ packages: ['foo'], versionHint: 'pin' }],
        errors: [{
          message: 'Invalid SemVer hint (pin).',
          type: 'Literal'
        }]
      }
    ],
    ...[ // packageRegex
      {
        code: '{ "dependencies": { "foo": "^1.2.3", "bar": "^1.2.3" } }',
        filename: 'package.json',
        options: [{ packageRegex: 'foo', versionHint: 'pin' }],
        errors: [{
          message: 'Invalid SemVer hint (pin).',
          type: 'Literal'
        }]
      }
    ],
    ...[ // grouping
      {
        code: '{ "dependencies": { "foo": "^1.2.3", "bar": "^1.2.3" } }',
        filename: 'package.json',
        options: [[
          { packages: ['foo'], versionHint: 'carat' },
          { packageRegex: 'bar', versionHint: 'pin' }
        ]],
        errors: [{
          message: 'Invalid SemVer hint (pin).',
          type: 'Literal'
        }]
      }
    ],
    ...[ // pinUnstable
      {
        code: '{ "dependencies": { "foo": "^0.1.2", "bar": "^1.2.3" } }',
        filename: 'package.json',
        options: [{ pinUnstable: true }],
        errors: [{
          message: 'Invalid SemVer hint on unstable.',
          type: 'Literal'
        }]
      },
      {
        code: '{ "dependencies": { "foo": "^1.2.3-alpha.0", "bar": "^1.2.3" } }',
        filename: 'package.json',
        options: [{ pinUnstable: true }],
        errors: [{
          message: 'Invalid SemVer hint on unstable.',
          type: 'Literal'
        }]
      }
    ]
  ]
}));
