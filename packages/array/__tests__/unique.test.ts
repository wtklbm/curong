import { unique } from '../src';

describe('unique', () => {
    test('去除数字数组中的重复元素', () => {
        const numbers = [1, 2, 3, 2, 1];
        expect(unique(numbers)).toEqual([1, 2, 3]);
    });

    test('去除字符串数组中的重复元素', () => {
        const fruits = ['apple', 'banana', 'apple', 'orange', 'banana'];
        expect(unique(fruits)).toEqual(['apple', 'banana', 'orange']);
    });

    test('去除混合类型数组中的重复元素', () => {
        const mixedArray = [1, 'apple', true, 1, 'apple', true];
        expect(unique(mixedArray)).toEqual([1, 'apple', true]);
    });

    test('空数组，返回空数组', () => {
        const emptyArray: any[] = [];
        expect(unique(emptyArray)).toEqual([]);
    });

    test('只包含一个元素的数组，返回该元素', () => {
        const singleElementArray = [42];
        expect(unique(singleElementArray)).toEqual([42]);
    });

    test('去除对象数组中的重复元素', () => {
        const o = { id: 1 };
        const objects = [o, { id: 2 }, o];
        expect(unique(objects)).toEqual([o, { id: 2 }]);
    });

    test('去除嵌套数组中的重复元素', () => {
        const a = [1, 2];
        const nestedArray = [a, [2, 3], a];
        expect(unique(nestedArray)).toEqual([a, [2, 3]]);
    });

    test('去除包含null和undefined的数组中的重复元素', () => {
        const arrayWithNullAndUndefined = [null, undefined, null, undefined];
        expect(unique(arrayWithNullAndUndefined)).toEqual([null, undefined]);
    });

    test('去除包含NaN的数组中的重复元素', () => {
        const arrayWithNaN = [NaN, NaN];
        expect(unique(arrayWithNaN)).toEqual([NaN]);
    });
});
