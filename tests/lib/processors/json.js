'use strict';

const { expect } = require('chai');
const { CLIEngine } = require('eslint');
const plugin = require('../../../lib');

function initCLI() {
  let cli = new CLIEngine({
    extensions: ['json'],
    ignore: false,
    rules: {
      'quote-props': [2, 'as-needed']
    },
    useEslintrc: false
  });
  cli.addPlugin('json', plugin);
  return cli;
}

describe('plugin', function() {
  let cli;
  let text = `{
  "foo": "bar"
}
`;

  before(function() {
    cli = initCLI();
  });

  it('should run on .json files', function() {
    let report = cli.executeOnText(text, 'test.json');

    expect(report.results.length).to.equal(1);
    expect(report.results[0].messages.length).to.equal(1);
    expect(report.results[0].messages[0].message).to.equal('Unnecessarily quoted property \'foo\' found.');
    expect(report.results[0].messages[0].line).to.equal(2);
  });
});
