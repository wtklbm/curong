import { deleteAttrs } from '../src';

describe('@curong/object/deleteAttrs', () => {
    test('测试1', () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(deleteAttrs(obj, ['b'])).toEqual({
            a: 1,
            c: 3
        });
    });
});
