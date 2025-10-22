import {describe, it, expect} from 'vitest';
import formatter from '../packages/eslint-formatter-json/index.js';
import {mockResults} from '../test-fixtures.js';

describe('eslint-formatter-json', () => {
	it('should format results correctly', () => {
		const output = formatter(mockResults);
		expect(output).toMatchSnapshot();
	});

	it('should return empty array for no errors', () => {
		const output = formatter([]);
		expect(output).toBe('[]');
	});
});
