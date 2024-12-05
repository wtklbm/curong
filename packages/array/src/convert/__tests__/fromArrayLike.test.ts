import { fromArrayLike } from '..';

describe('@curong/array/fromArrayLike', () => {
    test('测试1: 输入为类数组对象，返回数组', () => {
        const input = { 0: 'a', 1: 'b', length: 2 };
        const result = fromArrayLike(input);
        expect(result).toEqual(['a', 'b']);
    });

    test('测试2: 输入为类数组的字符串，返回字符数组', () => {
        const input = 'abc';
        const result = fromArrayLike(input);
        expect(result).toEqual(['a', 'b', 'c']);
    });

    test('测试3: 输入为类数组的数字，返回数字数组', () => {
        const input = { 0: 1, 1: 2, length: 2 };
        const result = fromArrayLike(input);
        expect(result).toEqual([1, 2]);
    });

    test('测试4: 输入为空类数组对象，返回空数组', () => {
        const input = { length: 0 };
        const result = fromArrayLike(input);
        expect(result).toEqual([]);
    });

    test('测试5: 输入为含有 `null` 的类数组对象，返回数组', () => {
        const input = { 0: null, 1: 2, length: 2 };
        const result = fromArrayLike(input);
        expect(result).toEqual([null, 2]);
    });

    test('测试6: 输入为类数组的布尔值，返回布尔数组', () => {
        const input = { 0: true, 1: false, length: 2 };
        const result = fromArrayLike(input);
        expect(result).toEqual([true, false]);
    });

    test('测试7: 输入为 `arguments` 对象，返回数组', () => {
        function testFunction(...args: any[]) {
            return fromArrayLike(args);
        }
        const result = testFunction(1, 2, 3);
        expect(result).toEqual([1, 2, 3]);
    });

    test('测试8: 基本测试', () => {
        expect(fromArrayLike([])).toEqual([]);
        expect(fromArrayLike([1, 2, 3])).toEqual([1, 2, 3]);
    });
    test('测试9: 测试多项值', () => {
        const print = function () {
            const args = fromArrayLike(arguments);
            expect(args).toEqual([1, 32, 43, 54, 2, 32]);
        };

        // @ts-ignore
        print(1, 32, 43, 54, 2, 32);

        expect(
            fromArrayLike({
                0: 't',
                1: 'o',
                length: 2
            })
        ).toEqual(['t', 'o']);
    });
});
