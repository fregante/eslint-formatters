# eslint-formatter-tap

> ESLint's `tap` formatter as a standalone package

## Demo

```
TAP version 13
1..3
not ok 1 - foo.js
  ---
  message: Unexpected foo.
  severity: error
  data:
    line: 5
    column: 10
    ruleId: foo
  ...
ok 2 - bar.js
  ---
  message: Unexpected bar.
  severity: warning
  data:
    line: 6
    column: 11
    ruleId: bar
  ...
not ok 3 - baz.js
  ---
  message: Fatal error parsing file.
  severity: error
  data:
    line: 1
    column: 1
    ruleId: ''
  ...
```
