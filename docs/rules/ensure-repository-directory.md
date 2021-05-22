# Ensure repository/directory in package.json (ensure-repository-directory)

Check that the repository/directory is the same as where the package.json lives.


## Rule Details

This rule aims to ensure the repository/directory of a package.

Examples of **incorrect** code for this rule:

```json
{
  "repository": {
    "directory": "wrong-package/bad-copy-paste"
  }
}
```

Examples of **correct** code for this rule:

```json
{
  "repository": {
    "directory": "correct-path"
  }
}
```

```json
{
  "repository": "no-directory"
}
```

### Options



## When Not To Use It

Using the directory is optional. If you aren't using it, you may not want this rule.

## Further Reading

https://docs.npmjs.com/files/package.json#repository
