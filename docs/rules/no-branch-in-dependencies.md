# prevent branches in package.json dependencies (no-branch-in-dependencies)

Sometimes you may accidentally commit a temporary branch of a dependency instead of a version.


## Rule Details

This rule aims to prevent branches instead of versions.

Examples of **incorrect** code for this rule:

```json
{
  "dependencies": {
    "lodash": "lodash/lodash"
  }
}
```

Examples of **correct** code for this rule:

```json
{
  "dependencies": {
    "lodash": "^4.17.11"
  }
}
```

### Options

* `"keys": ["dependencies", "devDependencies", "optionalDependencies"]` alter the dependency keys checked
* `"ignore": []` add certain dependencies to the ignore list

## When Not To Use It

If you use long-lived branches as part of your normal workflow, you may not want this rule.

## Further Reading

https://docs.npmjs.com/files/package.json#dependencies
