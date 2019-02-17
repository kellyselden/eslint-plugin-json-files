# require a license in package.json (require-license)

Enforce the license of a project


## Rule Details

This rule aims to prevent publishing an unlicensed package.

Examples of **incorrect** code for this rule:

```json
{
  "description": "missing license"
}
```

```json
{
  "license": "UNLICENSED"
}
```

Examples of **correct** code for this rule:

```json
{
  "license": "MIT"
}
```

### Options

* `"always"` (default) requires a string other than "UNLICENSED"
* `"allow-unlicensed"` allows the string "UNLICENSED"

## When Not To Use It

If this is a private package or app that isn't published, you may not want this rule.

## Further Reading

https://docs.npmjs.com/files/package.json#license

