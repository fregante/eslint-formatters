# eslint-formatter-json

> ESLint's `json` formatter as a standalone package

## Demo

```json
[
	{
		"filePath": "foo.js",
		"messages": [{"message": "Unexpected foo.", "severity": 2, "line": 5, "column": 10, "ruleId": "foo"}],
		"errorCount": 1,
		"warningCount": 0,
		"fixableErrorCount": 0,
		"fixableWarningCount": 0
	},
	{
		"filePath": "bar.js",
		"messages": [{"message": "Unexpected bar.", "severity": 1, "line": 6, "column": 11, "ruleId": "bar"}],
		"errorCount": 0,
		"warningCount": 1,
		"fixableErrorCount": 0,
		"fixableWarningCount": 0
	},
	{
		"filePath": "baz.js",
		"messages": [{"message": "Fatal error parsing file.", "severity": 2, "fatal": true, "line": 1, "column": 1, "ruleId": null}],
		"errorCount": 1,
		"warningCount": 0,
		"fixableErrorCount": 0,
		"fixableWarningCount": 0
	}
]
```
