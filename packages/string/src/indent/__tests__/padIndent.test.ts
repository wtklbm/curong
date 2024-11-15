import { padIndent } from '..';

describe('@curong/string/padIndent', () => {
    test('测试1', () => {
        expect(padIndent('')).toBe(' ');
        expect(padIndent('xxx')).toBe(' xxx');
        expect(padIndent('    ')).toBe('     ');
        expect(padIndent('    xxx')).toBe('     xxx');
    });

    test('测试2', () => {
        expect(
            padIndent(['// title', '//', '// test.'].join('\n'), {
                count: 2,
                emptyLines: false
            })
        ).toBe(['  // title', '  //', '  // test.'].join('\n'));

        expect(
            padIndent(['// title', '', '// test.'].join('\n'), {
                count: 2,
                emptyLines: false
            })
        ).toBe(['  // title', '', '  // test.'].join('\n'));

        expect(
            padIndent(['// title', '  ', '// test.'].join('\n'), {
                count: 2,
                emptyLines: false
            })
        ).toBe(['  // title', '    ', '  // test.'].join('\n'));

        expect(
            padIndent('description.\n\nthis is a test.', {
                count: 4,
                emptyLines: false
            })
        ).toBe('    description.\n\n    this is a test.');
    });
});
