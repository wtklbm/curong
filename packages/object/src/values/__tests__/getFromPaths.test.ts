import { getFromPaths } from '..';

describe('@curong/object/getFromPaths', () => {
    test('测试1: 应正确访问嵌套属性', () => {
        const obj = { a: { b: { c: 42 } } };
        expect(getFromPaths(obj, ['a', 'b', 'c'])).toBe(42);
    });

    test('测试2: 访问不存在的路径应返回 undefined', () => {
        const obj = { a: { b: { c: 42 } } };
        expect(getFromPaths(obj, ['a', 'x', 'c'])).toBeUndefined();
    });

    test('测试3: 访问空对象应返回 undefined', () => {
        const obj = {};
        expect(getFromPaths(obj, ['a', 'b'])).toBeUndefined();
    });

    test('测试4: 应正确访问数组中的路径', () => {
        const obj = { a: [1, 2, { b: 3 }] };
        expect(getFromPaths(obj, ['a', 2, 'b'])).toBe(3);
    });

    test('测试5: 应正确访问对象的直接属性', () => {
        const obj = { a: 10, b: 20 };
        expect(getFromPaths(obj, ['a'])).toBe(10);
        expect(getFromPaths(obj, ['b'])).toBe(20);
    });

    test('测试6: 部分路径存在时应返回 undefined', () => {
        const obj = { a: { b: { c: { d: 50 } } } };
        expect(getFromPaths(obj, ['a', 'b', 'c', 'x'])).toBeUndefined();
    });

    test('测试7: 路径中的 null 或 undefined 值', () => {
        const obj = { a: { b: null, c: { d: 100 }, e: undefined } };
        expect(getFromPaths(obj, ['a', 'b'])).toBe(null);
        expect(getFromPaths(obj, ['a', 'e'])).toBe(undefined);
        expect(getFromPaths(obj, ['a', 'b', 'd'])).toBeUndefined();
        expect(getFromPaths(obj, ['a', 'c', 'd'])).toBe(100);
    });

    test('测试8: 传递空路径应返回根对象', () => {
        const obj = { a: 1, b: 2 };
        expect(getFromPaths(obj, [])).toBe(obj);
    });

    test('测试9: 输入非对象类型', () => {
        expect(getFromPaths(42, ['a'])).toBeUndefined();
        expect(getFromPaths('string', ['length'])).toBe(6);
        expect(getFromPaths(null, ['a'])).toBeUndefined();
    });

    test('测试10: 属性值为 undefined 时应返回 undefined', () => {
        const obj = { a: { b: { c: undefined } } };
        expect(getFromPaths(obj, ['a', 'b', 'c'])).toBeUndefined();
    });

    test('测试11: 获取私有属性', () => {
        const arr = [
            [1, 2, 3],
            [4, 5, 6]
        ];
        expect(getFromPaths(arr, [0, 1])).toBe(2);
        expect(getFromPaths(arr, ['length'])).toBe(2);
        expect(getFromPaths(arr, ['push'])).toBeDefined();
        expect(getFromPaths(arr, ['push'], true)).toBeUndefined();
        expect(getFromPaths(arr, ['push'], false)).toBeDefined();
    });
});
