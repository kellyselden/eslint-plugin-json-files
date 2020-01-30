'use strict';

const { describe } = require('../../helpers/mocha');
const { expect } = require('../../helpers/chai');
const { CLIEngine } = require('eslint');

describe(function() {
  let cli;

  before(function() {
    cli = new CLIEngine({
      extensions: ['json'],
      ignore: false,
      rules: {
        'quote-props': [2, 'as-needed'],
        'json-files/require-license': [2]
      },
      useEslintrc: false,
      plugins: ['json-files']
    });
  });

  it('should run plugin on .json files', function() {
    let text = `{
  license: "UNLICENSED"
}
`;

    let report = cli.executeOnText(text, 'package.json');

    expect(report.results.length).to.equal(1);
    expect(report.results[0].messages.length).to.equal(1);
    expect(report.results[0].messages[0].message).to.equal('Missing license.');
    expect(report.results[0].messages[0].line).to.equal(1);
  });

  it('should ignore js rules on .json files', function() {
    let text = `{
  "license": "MIT"
}
`;

    let report = cli.executeOnText(text, 'package.json');

    expect(report.results.length).to.equal(1);
    expect(report.results[0].messages.length).to.equal(0);
  });

  it.skip('should run js rules on .json files', function() {
    let text = `{
  "license": "MIT"
}
`;

    let report = cli.executeOnText(text, 'package.json');

    expect(report.results.length).to.equal(1);
    expect(report.results[0].messages.length).to.equal(1);
    expect(report.results[0].messages[0].message).to.equal('Unnecessarily quoted property \'license\' found.');
    expect(report.results[0].messages[0].line).to.equal(2);
  });
});
