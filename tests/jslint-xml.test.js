import {describe, it, expect} from 'vitest';
import formatter from '../packages/eslint-formatter-jslint-xml/index.js';
import {mockResults} from '../test-fixtures.js';

describe('eslint-formatter-jslint-xml', () => {
	it('should format results correctly', () => {
		const output = formatter(mockResults);
		expect(output).toMatchSnapshot();
	});

	it('should return valid XML for empty results', () => {
		const output = formatter([]);
		expect(output).toContain('<?xml version="1.0" encoding="utf-8"?>');
		expect(output).toContain('<jslint>');
	});
});
