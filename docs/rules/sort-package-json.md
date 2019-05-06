# enforce package.json sorting (sort-package-json)

Use [sort-package-json](https://www.npmjs.com/package/sort-package-json) to keep your keys in a predictable order.


## Rule Details

This rule aims to enforce sorting.

Examples of **incorrect** code for this rule:

```json
{
  "name": "foo",
  "version": "1.0.0"
}
```

Examples of **correct** code for this rule:

```json
{
  "version": "1.0.0",
  "name": "foo"
}
```

### Options



## When Not To Use It

If you don't like the defaults of `sort-package-json`, you may not want this rule.

## Further Reading

https://github.com/keithamus/sort-package-json
