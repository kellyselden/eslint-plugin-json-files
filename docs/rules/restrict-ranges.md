# restrict the dependency ranges in package.json (restrict-ranges)

Enforce an allowed version ranges using hints or regular expressions.


## Rule Details

This rule aims to prevent too liberal of version ranges or branches.

Examples of **incorrect** code for this rule:

```js
/* eslint restrict-ranges: [{ versionHint: "pin' }] */

{
  "dependencies": {
    "foo": "^1.2.3"
  }
}
```

```js
/* eslint restrict-ranges: [{ versionRegex: "^[^#]+$' }] */

{
  "dependencies": {
    "foo": "foo/bar#baz"
  }
}
```

Examples of **correct** code for this rule:

```js
/* eslint restrict-ranges: [{ versionHint: "pin' }] */

{
  "dependencies": {
    "foo": "1.2.3"
  }
}
```

### Options

This rule has either an object option:

* `"dependencyTypes"` limit the dependency groups
* `"packages"` limit the range checking to select packages
* `"packageRegex"` limit the range checking to select packages
* `"versionHint"` limit the range using semver hints
  * `"pin"` no version hints
  * `"tilde"` include `~` or pinned
  * `"caret"` include `^`, `~`, or pinned
* `"versionRegex"` limit the range using a regular expression
* `"pinUnstable"` no version hints for 0.x.x or prerelease

Or an array of the object option above

## When Not To Use It

If you are the only one working on a project, you may not want this rule.

## Further Reading

https://semver.org/
