# prevent duplicate packages in dependencies and devDependencies (require-unique-dependency-names)

NPM and Yarn may only warn about this, but it could be better to avoid altogether.


## Rule Details

This rule aims to ensure the uniqueness of a package.

Examples of **incorrect** code for this rule:

```json
{
  "dependencies": {
    "foo": "0.0.0"
  },
  "devDependencies": {
    "foo": "0.0.0"
  }
}
```

Examples of **correct** code for this rule:

```json
{
  "dependencies": {
    "foo": "0.0.0"
  }
}
```

```json
{
  "dependencies": {
    "foo": "0.0.0"
  },
  "devDependencies": {
    "bar": "0.0.0"
  }
}
```

### Options



## When Not To Use It

Since it doesn't hurt to have this problem, you could ignore it.

