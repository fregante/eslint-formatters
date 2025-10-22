import {describe, it, expect} from 'vitest';
import {readdirSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packagesDir = join(__dirname, 'packages');

// Get all packages that have an index.js file
const packages = readdirSync(packagesDir, {withFileTypes: true})
	.filter(dirent => dirent.isDirectory())
	.map(dirent => dirent.name)
	.filter(name => {
		try {
			return readdirSync(join(packagesDir, name)).includes('index.js');
		} catch {
			return false;
		}
	});

// Test fixtures
const noErrors = [];

const singleFile = [
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

const multipleFiles = [
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

const withFixableIssues = [
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

const testCases = [
	{name: 'no-errors', fixture: noErrors},
	{name: 'single-file', fixture: singleFile},
	{name: 'multiple-files', fixture: multipleFiles},
	{name: 'with-fixable', fixture: withFixableIssues},
];

// Map packages to their appropriate file extensions
const extensionMap = {
	'eslint-formatter-json': '.json',
	'eslint-formatter-json-with-metadata': '.json',
	'eslint-formatter-checkstyle': '.xml',
	'eslint-formatter-jslint-xml': '.xml',
	'eslint-formatter-junit': '.xml',
};

// Run tests for each package
for (const pkg of packages) {
	describe(pkg, async () => {
		const formatter = (await import(`./packages/${pkg}/index.js`)).default;
		const ext = extensionMap[pkg] || '.log';

		for (const {name, fixture} of testCases) {
			it(name, async () => {
				const output = formatter(fixture);
				await expect(output).toMatchFileSnapshot(`./packages/${pkg}/examples/${name}${ext}`);
			});
		}
	});
}
