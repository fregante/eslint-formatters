import {describe, it, expect} from 'vitest';
import formatter from '../packages/eslint-formatter-jslint-xml/index.js';
import {noErrors, singleFile, multipleFiles, withFixableIssues} from '../test-fixtures.js';

describe('eslint-formatter-jslint-xml', () => {
	it('no errors', async () => {
		const output = formatter(noErrors);
		await expect(output).toMatchFileSnapshot('__file_snapshots__/jslint-xml/no-errors.txt');
	});

	it('single file with multiple errors', async () => {
		const output = formatter(singleFile);
		await expect(output).toMatchFileSnapshot('__file_snapshots__/jslint-xml/single-file.txt');
	});

	it('multiple files with different error types', async () => {
		const output = formatter(multipleFiles);
		await expect(output).toMatchFileSnapshot('__file_snapshots__/jslint-xml/multiple-files.txt');
	});

	it('with fixable issues', async () => {
		const output = formatter(withFixableIssues);
		await expect(output).toMatchFileSnapshot('__file_snapshots__/jslint-xml/with-fixable.txt');
	});
});
