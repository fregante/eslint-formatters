import {describe, it, expect} from 'vitest';
import formatter from '../packages/eslint-formatter-visualstudio/index.js';
import {mockResults} from '../test-fixtures.js';

describe('eslint-formatter-visualstudio', () => {
	it('should format results correctly', () => {
		const output = formatter(mockResults);
		expect(output).toMatchSnapshot();
	});

	it('should return no problems for empty results', () => {
		const output = formatter([]);
		expect(output).toBe('no problems');
	});
});
