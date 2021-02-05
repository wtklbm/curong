import { deleteAttrs } from '../src';

describe('@curong/object/deleteAttrs', () => {
    test('测试1', () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(deleteAttrs(obj, ['b'])).toEqual({
            a: 1,
            c: 3
        });
    });

    test('测试2', () => {
        const obj = { a: 1, b: 2, c: 3 };

        Object.defineProperty(obj, 'del', {
            value: 'not delete'
        });

        Object.defineProperty(obj, 'nod', {
            value: 'not delete'
        });

        // @ts-ignore
        const newObj = deleteAttrs(obj, ['del']);
        // @ts-ignore
        expect(newObj.nod).toBe('not delete');
        expect(newObj).toEqual({
            a: 1,
            b: 2,
            c: 3
        });
    });
});
