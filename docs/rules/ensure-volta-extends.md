# Ensure volta/extends in package.json (ensure-repository-directory)

Check that the volta/extends file exists and has a volta config.


## Rule Details

This rule aims to ensure the volta/extends file exists and has a volta config.

Examples of **incorrect** code for this rule:

```json
{
  "volta": {
    "extends": "wrong-package/bad-copy-paste"
  }
}
```

Examples of **correct** code for this rule:

```json
{
  "volta": {
    "extends": "correct-path"
  }
}
```

```json
{
  "volta": {}
}
```

### Options



## When Not To Use It

Extending is optional. If you aren't using it, you may not want this rule.

## Further Reading

https://volta.sh
