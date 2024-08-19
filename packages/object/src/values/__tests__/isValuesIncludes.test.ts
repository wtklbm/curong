import { isValuesIncludes } from '..';

describe('isValuesIncludes', () => {
    test('测试1', () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(isValuesIncludes(obj, 2)).toBe(true);
        expect(isValuesIncludes(obj, 2, true)).toBe(true);
    });

    test('测试2', () => {
        const arrayLikeObj = { 0: 'a', 1: 'b', length: 2 };
        expect(isValuesIncludes(arrayLikeObj, 'b')).toBe(true);
        expect(isValuesIncludes(arrayLikeObj, 'b', true)).toBe(true);
    });

    test('测试3', () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(isValuesIncludes(obj, [2, 4])).toBe(false);
        expect(isValuesIncludes(obj, [2, 4], false)).toBe(false);
        expect(isValuesIncludes(obj, [2, 4], true)).toBe(true);
    });

    test('测试4', () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(isValuesIncludes(obj, 4)).toBe(false);
        expect(isValuesIncludes(obj, 4, false)).toBe(false);
        expect(isValuesIncludes(obj, 4, true)).toBe(false);
    });

    test('测试5', () => {
        const arrayLikeObj = { 0: 'a', 1: 'b', length: 2 };
        expect(isValuesIncludes(arrayLikeObj, 'c')).toBe(false);
        expect(isValuesIncludes(arrayLikeObj, 'c', false)).toBe(false);
        expect(isValuesIncludes(arrayLikeObj, 'c', true)).toBe(false);
    });

    test('测试6', () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(isValuesIncludes(obj, [4, 5])).toBe(false);
        expect(isValuesIncludes(obj, [4, 5], false)).toBe(false);
        expect(isValuesIncludes(obj, [4, 5], true)).toBe(false);
    });
});
