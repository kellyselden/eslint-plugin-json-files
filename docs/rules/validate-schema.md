# require a valid JSON Schema in package.json (validate-schema)

Require a valid JSON Schema.


## Rule Details

This rule aims to prevent your JSON getting in a bad state.

Examples of **incorrect** code for this rule:

```json
/* eslint validate-schema: [{
  schema: JSON.stringify({
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "object",
    "not": { "required": ["description"] }
  })
}] */

{
  "description": "hello"
}
```

Examples of **correct** code for this rule:

```json
/* eslint validate-schema: [{
  schema: JSON.stringify({
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "object",
    "properties": {
      "foo": { "type": "string" }
    }
  })
}] */

{
  "description": "hello"
}
```

### Options

An options object of:

* `"schema"` a string of your JSON Schema
* `"prettyErrors"` on by default. Set this to false if you want more machine-readable errors.

## When Not To Use It

If you don't want to enforce or prevent any properties, you may not want this rule.

## Further Reading

https://json-schema.org
