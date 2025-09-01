'use strict';

const { describe } = require('../../helpers/mocha');
const { expect } = require('../../helpers/chai');
const { ESLint } = require('eslint');
const jsonFiles = require('../../../lib');

describe(function() {
  async function _test({ rules, fix, text }) {
    let cli = new ESLint({
      ignore: false,
      overrideConfigFile: true,
      overrideConfig: {
        files: ['package.json'],
        rules,
        plugins: {
          'json-files': jsonFiles,
        },
        processor: jsonFiles.processors.json,
      },
      fix,
    });

    let results = await cli.lintText(text, { filePath: 'package.json' });

    expect(results.length).to.equal(1);

    return results;
  }

  it('should run plugin on .json files', async function() {
    let text = `{
  "license": "UNLICENSED"
}
`;

    let results = await _test({
      rules: {
        'json-files/require-license': [2],
      },
      text,
    });

    expect(results[0].messages.length).to.equal(1);
    expect(results[0].messages[0].message).to.equal('Missing license.');
    expect(results[0].messages[0].line).to.equal(2);
  });

  it('should fix issues in .json files', async function() {
    let text = `{
  "version": "1.0.0",
  "name": "foo"
}
`;

    let results = await _test({
      rules: {
        'json-files/sort-package-json': [2],
      },
      fix: true,
      text,
    });

    expect(results[0].output).to.equal(`{
  "name": "foo",
  "version": "1.0.0"
}
`);
  });

  it('should ignore js rules on .json files', async function() {
    let text = `{
  "foo": "",
  "bar": ""
}
`;

    let results = await _test({
      rules: {
        'sort-keys': [2],
      },
      text,
    });

    expect(results[0].messages.length).to.equal(0);
  });

  it.skip('should run js rules on .json files', async function() {
    let text = `{
  "foo": "",
  "bar": ""
}
`;

    let results = await _test({
      rules: {
        'sort-keys': [2],
      },
      text,
    });

    expect(results[0].messages.length).to.equal(1);
    expect(results[0].messages[0].message).to.equal('Unnecessarily quoted property \'license\' found.');
    expect(results[0].messages[0].line).to.equal(2);
  });
});
