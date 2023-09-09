import { multiReplace } from '../src';

describe('@curong/string/multiReplace', () => {
    test('测试1', () => {
        let ret = multiReplace('this is good.', [
            [/this/, 'book'],
            [/good/, v => v.toUpperCase()]
        ]);

        expect(ret).toBe('book is GOOD.');
    });

    test('测试2', () => {
        let ret = multiReplace('this is good.', [
            {
                match: /this/,
                replacer: 'book'
            },
            {
                match: /good/,
                replacer: v => v.toUpperCase()
            }
        ]);

        expect(ret).toBe('book is GOOD.');
    });

    test('测试3', () => {
        const s = 'this is good.';

        let ret = multiReplace(s, [[/book/, 'this']]);
        expect(ret).toBe('this is good.');

        ret = multiReplace(s, [
            {
                match: /book/,
                replacer: 'this'
            }
        ]);

        expect(ret).toBe('this is good.');
    });
});
