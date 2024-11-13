import { allAttrs } from '../src';

describe('@curong/util/allAttrs', () => {
    test('测试1', () => {
        expect(allAttrs(null)).toEqual([]);
        expect(allAttrs(undefined)).toEqual([]);
        expect(allAttrs(1)).toEqual([]);
        expect(allAttrs(true)).toEqual([]);
        expect(allAttrs('')).toEqual([]);
        expect(allAttrs(Symbol('x'))).toEqual([]);
    });

    test('测试2', () => {
        expect(allAttrs({ a: 1, s: 'str', [Symbol('x')]: 'x' }).length).toBe(3);
    });

    test('测试3', () => {
        const target = {};
        const handler = {
            ownKeys: () => {
                throw new Error('Error in ownKeys handler');
            }
        };

        const proxy = new Proxy(target, handler);
        expect(allAttrs(proxy)).toEqual([]);
    });
});
