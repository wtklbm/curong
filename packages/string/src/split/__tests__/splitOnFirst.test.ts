import { splitOnFirst } from '..';

describe('@curong/string/splitOnFirst', () => {
    test('测试1：分隔符存在且能成功分割字符串', () => {
        const result = splitOnFirst('hello world', ' ');
        expect(result).toEqual(['hello', 'world']);
    });

    test('测试2：分隔符不存在，返回空数组', () => {
        const result = splitOnFirst('hello world', ',');
        expect(result).toEqual([]);
    });

    test('测试3：分隔符为空字符串，返回空数组', () => {
        const result = splitOnFirst('hello world', '');
        expect(result).toEqual([]);
    });

    test('测试4：输入字符串为空，返回空数组', () => {
        const result = splitOnFirst('', ' ');
        expect(result).toEqual([]);
    });

    test('测试5：输入字符串和分隔符相等，返回空数组', () => {
        const result = splitOnFirst('hello', 'hello');
        expect(result).toEqual([]);
    });

    test('测试6：分隔符出现在字符串开头，返回正确分割结果', () => {
        const result = splitOnFirst('world hello', ' ');
        expect(result).toEqual(['world', 'hello']);
    });

    test('测试7：分隔符出现在字符串结尾，返回正确分割结果', () => {
        const result = splitOnFirst('hello world ', ' ');
        expect(result).toEqual(['hello', 'world ']);
    });

    test('测试8：分隔符为空，返回空数组', () => {
        const result = splitOnFirst('hello world', '');
        expect(result).toEqual([]);
    });

    test('测试9：多个相同分隔符，仅分割第一次出现的分隔符', () => {
        const result = splitOnFirst('hello world hello', ' ');
        expect(result).toEqual(['hello', 'world hello']);
    });

    test('测试10：字符串和分隔符相同，返回空数组', () => {
        const result = splitOnFirst('same', 'same');
        expect(result).toEqual([]);
    });
});
