import { toArray } from '../src';

describe('@curong/object/toArray', () => {
    test('使用 Object.keys 获取可枚举属性', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const result = toArray(obj);
        expect(result).toEqual([
            ['a', 1],
            ['b', 2],
            ['c', 3]
        ]);
    });

    test('使用 Object.getOwnPropertyNames 获取可枚举属性和不可枚举属性', () => {
        const obj = { a: 1, b: 2 };
        Object.defineProperty(obj, 'c', {
            value: 3,
            enumerable: false
        });
        const result = toArray(obj, undefined, 1);
        expect(result).toEqual([
            ['a', 1],
            ['b', 2],
            ['c', 3]
        ]);
    });

    test('使用 Object.getOwnPropertySymbols 获取 Symbol 属性', () => {
        const sym1 = Symbol('sym1');
        const sym2 = Symbol('sym2');
        const obj = { [sym1]: 1, [sym2]: 2 };
        const result = toArray(obj, undefined, 2);
        expect(result).toEqual([
            [sym1, 1],
            [sym2, 2]
        ]);
    });

    test('使用 Reflect.ownKeys 获取所有属性', () => {
        const sym1 = Symbol('sym1');
        const obj = { a: 1 };
        Object.defineProperty(obj, 'b', {
            value: 2,
            enumerable: false
        });
        // @ts-ignore
        obj[sym1] = 3;
        const result = toArray(obj, undefined, 3);
        expect(result).toEqual([
            ['a', 1],
            ['b', 2],
            [sym1, 3]
        ]);
    });

    test('自定义 converter 函数', () => {
        const obj = { a: 1, b: 2 };
        const converter = (key: any, value: any) => `${key}: ${value}`;
        const result = toArray(obj, converter);
        expect(result).toEqual(['a: 1', 'b: 2']);
    });
});
