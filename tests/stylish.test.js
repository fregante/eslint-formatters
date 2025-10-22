import {describe, it, expect} from 'vitest';
import formatter from '../packages/eslint-formatter-stylish/index.js';
import {mockResults} from '../test-fixtures.js';

describe('eslint-formatter-stylish', () => {
	it('should format results correctly', () => {
		const output = formatter(mockResults);
		expect(output).toMatchSnapshot();
	});

	it('should return empty string for no errors', () => {
		const output = formatter([]);
		expect(output).toBe('');
	});
});
