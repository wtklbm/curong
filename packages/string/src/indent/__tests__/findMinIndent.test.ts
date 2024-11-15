import { findMinIndent } from '..';

describe('@curong/string/findMinIndent', () => {
    test('测试1', () => {
        expect(findMinIndent('')).toBe(0);
        expect(findMinIndent('xxx')).toBe(0);
        expect(findMinIndent('    ')).toBe(4);
        expect(findMinIndent('    xxx')).toBe(4);
        expect(findMinIndent(` \u3000xxx\u200B `)).toBe(2);
    });

    /* prettier-ignore */
    test('测试2', () => {
        const options = {
            emptyLines: false
        };

        expect(
            findMinIndent(
                [
                    '\t// title',
                    '\t//',
                    '// description.'
                ].join('\n')
            )
        ).toBe(0);

        expect(
            findMinIndent(
                [
                    '   hello',
                    '',
                    ' hello',
                    '   world'
                ].join('\n')
            )
        ).toBe(0);

        expect(
            findMinIndent(
                [
                    '   hello',
                    '',
                    ' hello',
                    '   world'
                ].join('\n'),
                options
            )
        ).toBe(1);

        expect(
            findMinIndent(
                [
                    '    /**',
                    '     * this is a test.',
                    '     */'
                ].join('\n')
            )
        ).toBe(4);

        expect(
            findMinIndent(
                [
                    '    // this is a test.',
                    '    //',
                    '    // very good.'
                ].join('\n')
            )
        ).toBe(4);

        expect(
            findMinIndent(
                [
                    '    // this is a test.',
                    '',
                    '    // very good.'
                ].join('\n'),
                options
            )
        ).toBe(4);

        expect(
            findMinIndent(
                [
                    '    // this is a test.',
                    '    ',
                    '    // very good.'
                ].join('\n')
            )
        ).toBe(4);
    });
});
