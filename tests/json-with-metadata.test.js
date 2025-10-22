import {describe, it, expect} from 'vitest';
import formatter from '../packages/eslint-formatter-json-with-metadata/index.js';
import {mockResults} from '../test-fixtures.js';

describe('eslint-formatter-json-with-metadata', () => {
	it('should format results correctly', () => {
		const output = formatter(mockResults);
		expect(output).toMatchSnapshot();
	});

	it('should return metadata for empty results', () => {
		const output = formatter([]);
		const parsed = JSON.parse(output);
		expect(parsed).toHaveProperty('results');
		expect(parsed.results).toEqual([]);
	});
});
