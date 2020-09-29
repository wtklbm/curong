import { lackAttrs } from '../src';

const obj = { a: 1, s: 's' };

describe('@curong/util/lackAttrs', () => {
    test('测试1', () => {
        // @ts-ignore
        expect(lackAttrs(null)).toEqual([]);
        // @ts-ignore
        expect(lackAttrs(null, null)).toEqual([]);
    });

    test('测试2', () => {
        expect(lackAttrs(obj, ['a', 'b', 'c'])).toEqual(['b', 'c']);
    });
});
