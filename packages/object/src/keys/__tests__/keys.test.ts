import { keys } from '..';

// 用于测试的对象
const b = Symbol('yes');
const obj = { a: 1, [b]: 'yes' };

Object.defineProperty(obj, 'c', {
    value: 4,
    enumerable: false // 将属性设置为不可枚举
});

describe('keys function', () => {
    test('should throw a TypeError for invalid methodLevel', () => {
        // @ts-ignore
        expect(() => keys(obj, 4)).toThrowError();
        // @ts-ignore
        expect(() => keys(obj, -1)).toThrowError();
    });

    test('should handle an empty object', () => {
        expect(keys({})).toEqual([]);
        expect(keys([])).toEqual([]);
    });

    test('should use methodLevel 0 by default and call the corresponding function', () => {
        expect(keys(obj)).toEqual(['a']);
        expect(Object.keys(obj)).toEqual(['a']);
    });

    test('should call the function corresponding to methodLevel 1', () => {
        expect(keys(obj, 1)).toEqual(['a', 'c']);
        expect(Object.getOwnPropertyNames(obj)).toEqual(['a', 'c']);
    });

    test('should call the function corresponding to methodLevel 2', () => {
        expect(keys(obj, 2)).toEqual([b]);
        expect(Object.getOwnPropertySymbols(obj)).toEqual([b]);
    });

    test('should call the function corresponding to methodLevel 2', () => {
        expect(keys(obj, 3)).toEqual(['a', 'c', b]);
        expect(Reflect.ownKeys(obj)).toEqual(['a', 'c', b]);
    });

    test('should handle array-like objects', () => {
        const arrayLike = { 0: 'a', 1: 'b', length: 2 };
        const result = keys(arrayLike);
        expect(result).toEqual(['0', '1', 'length']);
        expect(Object.keys(arrayLike)).toEqual(['0', '1', 'length']);
    });
});
