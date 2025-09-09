# eslint-plugin-json-files

[![npm version](https://badge.fury.io/js/eslint-plugin-json-files.svg)](https://badge.fury.io/js/eslint-plugin-json-files)

ESLint JSON processor and rules

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-json-files`:

```
$ npm install eslint-plugin-json-files --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-json-files` globally.

## Usage

Add `json-files` to the plugins and processor section of your `eslint.config.js` configuration file.
You can omit the `eslint-plugin-` prefix:

```js
const jsonFiles = require('eslint-plugin-json-files');

// ...

{
  plugins: {
    'json-files': jsonFiles,
  },
  processor: 'json-files/json',
}
```

Then configure the rules you want to use under the rules section.

```js
{
  rules: {
    'json-files/rule-name': 'error',
  },
}
```

## Supported Rules

| Rule ID | Description |
|:--------|:------------|
| [json-files/ensure-repository-directory](./docs/rules/ensure-repository-directory.md) | ensure repository/directory in package.json |
| [json-files/ensure-volta-extends](./docs/rules/ensure-volta-extends.md) | ensure volta-extends in package.json |
| [json-files/ensure-workspaces](./docs/rules/ensure-workspaces.md) | ensure workspace globs in package.json resolve to directories |
| [json-files/eol-last](./docs/rules/eol-last.md) | require or disallow newline at the end of package.json |
| [json-files/no-branch-in-dependencies](./docs/rules/no-branch-in-dependencies.md) | prevent branches in package.json dependencies |
| [json-files/require-engines](./docs/rules/require-engines.md) | require the engines field in package.json |
| [json-files/require-license](./docs/rules/require-license.md) | require a license in package.json |
| [json-files/require-unique-dependency-names](./docs/rules/require-unique-dependency-names.md) | prevent duplicate packages in dependencies and devDependencies |
| [json-files/restrict-ranges](./docs/rules/restrict-ranges.md) | restrict the dependency ranges in package.json |
| [json-files/sort-package-json](./docs/rules/sort-package-json.md) | enforce package.json sorting |
| [json-files/validate-schema](./docs/rules/validate-schema.md) | require a valid JSON Schema |

## Footnotes

I wouldn't mind getting this merged into [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node) or [eslint-plugin-json](https://github.com/azeemba/eslint-plugin-json).
