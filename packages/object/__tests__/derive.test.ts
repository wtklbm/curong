import { derive } from '../src';

describe('@curong/object/derive', () => {
    test('测试1', () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(derive(obj, ['b'])).toEqual({
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
        const newObj = derive(obj, ['del']);
        // @ts-ignore
        expect(newObj.nod).toBe('not delete');
        expect(newObj).toEqual({
            a: 1,
            b: 2,
            c: 3
        });
    });
});
