# Ensure workspace globs in package.json resolve to directories (ensure-workspaces)

Check that the monorepo workspace globs find dirs with package.json files.


## Rule Details

This rule aims to ensure the workspace globs find dirs with package.json files.

Examples of **incorrect** code for this rule:

```json
{
  "workspace": [
    "packages/*/missing-dir"
  ]
}
```

Examples of **correct** code for this rule:

```json
{
  "workspace": [
    "packages/*/dir-with-package-json"
  ]
}
```

```json
{
  "workspace": [
    "packages/dir-with-package-json"
  ]
}
```

```json
{
  "workspace": {
    "packages": [
      "packages/*/dir-with-package-json"
    ]
  }
}
```

### Options



## When Not To Use It

If workspace globs are placeholders for future packages.

## Further Reading

https://docs.npmjs.com/cli/v10/configuring-npm/package-json#workspaces
