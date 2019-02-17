'use strict';

let assert = require('chai').assert;
let CLIEngine = require('eslint').CLIEngine;
let plugin = require('../../../lib');

function initCLI(isAutofixEnabled) {
  let fix = isAutofixEnabled || false;
  let cli = new CLIEngine({
    envs: ['browser'],
    extensions: ['json'],
    fix,
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
  let shortText = `{
  "asdf": "sdfa"
}
`;

  before(function() {
    cli = initCLI();
  });

  it('should run on .json files', function() {
    let report = cli.executeOnText(shortText, 'package.json');

    assert.equal(report.results.length, 1);
    assert.equal(report.results[0].messages.length, 1);
    assert.equal(report.results[0].messages[0].message, 'Unnecessarily quoted property \'asdf\' found.');
    assert.equal(report.results[0].messages[0].line, 2);
  });
});
