// Mock ESLint results for testing formatters

// No errors
export const noErrors = [];

// Single file with multiple errors (errors and warnings)
export const singleFile = [
	{
		filePath: 'foo.js',
		messages: [
			{
				message: 'Unexpected foo.',
				severity: 2,
				line: 5,
				column: 10,
				ruleId: 'foo',
			},
			{
				message: 'Missing semicolon.',
				severity: 2,
				line: 10,
				column: 15,
				ruleId: 'semi',
			},
			{
				message: 'Unused variable.',
				severity: 1,
				line: 3,
				column: 8,
				ruleId: 'no-unused-vars',
			},
		],
		errorCount: 2,
		warningCount: 1,
		fixableErrorCount: 1,
		fixableWarningCount: 0,
	},
];

// Multiple files with different error types
export const multipleFiles = [
	{
		filePath: 'foo.js',
		messages: [
			{
				message: 'Unexpected foo.',
				severity: 2,
				line: 5,
				column: 10,
				ruleId: 'foo',
			},
		],
		errorCount: 1,
		warningCount: 0,
		fixableErrorCount: 0,
		fixableWarningCount: 0,
	},
	{
		filePath: 'bar.js',
		messages: [
			{
				message: 'Unexpected bar.',
				severity: 1,
				line: 6,
				column: 11,
				ruleId: 'bar',
			},
		],
		errorCount: 0,
		warningCount: 1,
		fixableErrorCount: 0,
		fixableWarningCount: 0,
	},
	{
		filePath: 'baz.js',
		messages: [
			{
				message: 'Fatal error parsing file.',
				severity: 2,
				fatal: true,
				line: 1,
				column: 1,
				ruleId: null,
			},
		],
		errorCount: 1,
		warningCount: 0,
		fixableErrorCount: 0,
		fixableWarningCount: 0,
	},
];

// Multiple errors and warnings with fixable issues
export const withFixableIssues = [
	{
		filePath: 'fixable.js',
		messages: [
			{
				message: 'Missing semicolon.',
				severity: 2,
				line: 5,
				column: 20,
				ruleId: 'semi',
			},
			{
				message: 'Unexpected trailing comma.',
				severity: 2,
				line: 8,
				column: 15,
				ruleId: 'comma-dangle',
			},
			{
				message: 'Prefer const over let.',
				severity: 1,
				line: 3,
				column: 1,
				ruleId: 'prefer-const',
			},
		],
		errorCount: 2,
		warningCount: 1,
		fixableErrorCount: 2,
		fixableWarningCount: 1,
	},
];
