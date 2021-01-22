import { lackAttrs } from '../src';

const obj = { a: 1, s: 's' };

describe('@curong/util/lackAttrs', () => {
    test('测试1', () => {
        expect(lackAttrs(obj, ['a', 'b', 'c'])).toEqual(['b', 'c']);
    });
});
