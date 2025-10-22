import {describe, it, expect} from 'vitest';
import formatter from '../packages/eslint-formatter-tap/index.js';
import {mockResults} from '../test-fixtures.js';

describe('eslint-formatter-tap', () => {
	it('should format results correctly', () => {
		const output = formatter(mockResults);
		expect(output).toMatchSnapshot();
	});

	it('should return TAP format for empty results', () => {
		const output = formatter([]);
		expect(output).toContain('TAP version 13');
		expect(output).toContain('1..0');
	});
});
