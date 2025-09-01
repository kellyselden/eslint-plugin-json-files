'use strict';

const { describe } = require('../../helpers/mocha');
const { expect } = require('../../helpers/chai');
const { ESLint } = require('eslint');
const jsonFiles = require('../../../lib');

describe(function() {
  let cli;

  before(function() {
    cli = new ESLint({
      ignore: false,
      overrideConfig: {
        files: ['package.json'],
        rules: {
          'quote-props': [2, 'as-needed'],
          'json-files/require-license': [2],
        },
        plugins: {
          'json-files': jsonFiles,
        },
      },
    });
  });

  it('should run plugin on .json files', async function() {
    let text = `{
  license: "UNLICENSED"
}
`;

    let results = await cli.lintText(text, { filePath: 'package.json' });

    expect(results.length).to.equal(1);
    expect(results[0].messages.length).to.equal(1);
    expect(results[0].messages[0].message).to.equal('Missing license.');
    expect(results[0].messages[0].line).to.equal(1);
  });

  it('should fix issues in .json files', async function() {
    let fixerCli = new ESLint({
      ignore: false,
      overrideConfig: {
        files: ['package.json'],
        rules: {
          'json-files/sort-package-json': [2],
        },
        plugins: {
          'json-files': jsonFiles,
        },
      },
      fix: true,
    });

    let text = `{
  "version": "1.0.0",
  "name": "foo"
}
`;

    let results = await fixerCli.lintText(text, { filePath: 'package.json' });

    expect(results.length).to.equal(1);
    expect(results[0].output).to.equal(`{
  "name": "foo",
  "version": "1.0.0"
}
`);
  });

  it('should ignore js rules on .json files', async function() {
    let text = `{
  "license": "MIT"
}
`;

    let results = await cli.lintText(text, { filePath: 'package.json' });

    expect(results.length).to.equal(1);
    expect(results[0].messages.length).to.equal(0);
  });

  it.skip('should run js rules on .json files', async function() {
    let text = `{
  "license": "MIT"
}
`;

    let results = await cli.lintText(text, { filePath: 'package.json' });

    expect(results.length).to.equal(1);
    expect(results[0].messages.length).to.equal(1);
    expect(results[0].messages[0].message).to.equal('Unnecessarily quoted property \'license\' found.');
    expect(results[0].messages[0].line).to.equal(2);
  });
});
