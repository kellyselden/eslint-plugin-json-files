# eslint-plugin-json-files

[![npm version](https://badge.fury.io/js/eslint-plugin-json-files.svg)](https://badge.fury.io/js/eslint-plugin-json-files)
[![Build Status](https://travis-ci.org/kellyselden/eslint-plugin-json-files.svg?branch=master)](https://travis-ci.org/kellyselden/eslint-plugin-json-files)

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

Add `json-files` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "json-files"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "json-files/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





