import { fromIterable } from '..';

describe('@curong/array/fromIterable', () => {
    test('测试1: 输入为同步可迭代对象，返回数组', () => {
        function* generator() {
            yield 1;
            yield 2;
            yield 3;
        }
        const input = generator();
        const result = fromIterable(input);
        expect(result).toEqual([1, 2, 3]);
    });

    test('测试2: 输入为空的同步可迭代对象，返回空数组', () => {
        function* generator() {
            // No yield
        }
        const input = generator();
        const result = fromIterable(input);
        expect(result).toEqual([]);
    });

    test('测试3: 输入为字符串的同步可迭代对象，返回字符数组', () => {
        const input = 'abc';
        const result = fromIterable(input);
        expect(result).toEqual(['a', 'b', 'c']);
    });

    test('测试4: 输入为数组的同步可迭代对象，返回数组副本', () => {
        const input = [1, 2, 3];
        const result = fromIterable(input);
        expect(result).toEqual([1, 2, 3]);
    });

    test('测试5: 输入为含有对象的同步可迭代对象，返回对象数组', () => {
        function* generator() {
            yield { key: 'value' };
            yield { key: 'anotherValue' };
        }
        const input = generator();
        const result = fromIterable(input);
        expect(result).toEqual([{ key: 'value' }, { key: 'anotherValue' }]);
    });

    test('测试6: 输入为一个数值的同步可迭代对象，返回数值数组', () => {
        const input = [42];
        const result = fromIterable(input);
        expect(result).toEqual([42]);
    });
});
