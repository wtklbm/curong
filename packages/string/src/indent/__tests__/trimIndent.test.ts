import { trimIndent } from '..';

describe('@curong/string/trimIndent', () => {
    test('测试1', () => {
        expect(trimIndent('')).toBe('');
        expect(trimIndent('xxx')).toBe('xxx');
        expect(trimIndent('    ')).toBe('');
        expect(trimIndent('    xxx')).toBe('xxx');
    });

    test('测试2', () => {
        expect(
            trimIndent(['  // title', '  //', '  // test.'].join('\n'), {
                emptyLines: false
            })
        ).toBe(['// title', '//', '// test.'].join('\n'));

        expect(
            trimIndent(['  // title', '', '  // test.'].join('\n'), {
                emptyLines: false
            })
        ).toBe(['// title', '', '// test.'].join('\n'));

        expect(
            trimIndent(['  // title', '    ', '  // test.'].join('\n'), {
                emptyLines: false
            })
        ).toBe(['// title', '  ', '// test.'].join('\n'));

        expect(
            trimIndent('    description.\n\n    this is a test.', {
                emptyLines: false
            })
        ).toBe('description.\n\nthis is a test.');
    });
});
