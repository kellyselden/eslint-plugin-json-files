"use strict";

var assert = require("chai").assert,
    CLIEngine = require("eslint").CLIEngine,
    plugin = require("../../../lib");

function initCLI(isAutofixEnabled) {
    var fix = isAutofixEnabled || false;
    var cli = new CLIEngine({
        envs: ["browser"],
        extensions: ["json"],
        fix: fix,
        ignore: false,
        rules: {
            "quote-props": [2, 'as-needed']
        },
        useEslintrc: false
    });
    cli.addPlugin("json", plugin);
    return cli;
}

describe("plugin", function() {

    var cli;
    var shortText = `{
  "asdf": "sdfa"
}
`;

    before(function() {
        cli = initCLI();
    });

    it("should run on .json files", function() {
        var report = cli.executeOnText(shortText, "package.json");

        assert.equal(report.results.length, 1);
        assert.equal(report.results[0].messages.length, 1);
        assert.equal(report.results[0].messages[0].message, "Unnecessarily quoted property 'asdf' found.");
        assert.equal(report.results[0].messages[0].line, 2);
    });
});
