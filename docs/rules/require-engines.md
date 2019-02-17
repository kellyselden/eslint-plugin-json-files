# require the engines field in package.json (require-engines)

Enforce the engine of a project


## Rule Details

This rule aims to enforce the engine of a package.

Examples of **incorrect** code for this rule:

```json
{
  "description": "missing engines"
}
```

```json
{
  "engines": {}
}
```

Examples of **correct** code for this rule:

```json
{
  "engines": {
    "node": ">=8"
  }
}
```

### Options

* `"node-only"` (default) requires a string other than "UNLICENSED"
* `"require-npm"` allows the string "UNLICENSED"

## When Not To Use It

If this is local project, and you're always using the latest node version, you may not want this rule.

## Further Reading

https://docs.npmjs.com/files/package.json#engines
