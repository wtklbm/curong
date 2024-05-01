import { isTruthyArray } from '../src';

describe('@curong/types/isTruthyArray', () => {
    test('测试1', () => {
        expect(isTruthyArray(false)).toBe(false);
        expect(isTruthyArray(0)).toBe(false);
        expect(isTruthyArray(-0)).toBe(false);
        expect(isTruthyArray(0n)).toBe(false);
        expect(isTruthyArray('')).toBe(false);
        expect(isTruthyArray('1')).toBe(false);
        expect(isTruthyArray(null)).toBe(false);
        expect(isTruthyArray(undefined)).toBe(false);
        expect(isTruthyArray(NaN)).toBe(false);
    });

    test('测试2', () => {
        expect(isTruthyArray([false])).toBe(false);
        expect(isTruthyArray([0])).toBe(false);
        expect(isTruthyArray([-0])).toBe(false);
        expect(isTruthyArray([0n])).toBe(false);
        expect(isTruthyArray([''])).toBe(false);
        expect(isTruthyArray(['1'])).toBe(true);
        expect(isTruthyArray([null])).toBe(false);
        expect(isTruthyArray([undefined])).toBe(false);
        expect(isTruthyArray([NaN])).toBe(false);
    });

    test('测试3', () => {
        expect(isTruthyArray([1, false])).toBe(false);
        expect(isTruthyArray([1, 0])).toBe(false);
        expect(isTruthyArray([1, -0])).toBe(false);
        expect(isTruthyArray([1, 0n])).toBe(false);
        expect(isTruthyArray([1, ''])).toBe(false);
        expect(isTruthyArray([1, '1'])).toBe(true);
        expect(isTruthyArray([1, null])).toBe(false);
        expect(isTruthyArray([1, undefined])).toBe(false);
        expect(isTruthyArray([1, NaN])).toBe(false);
    });

    test('测试4', () => {
        expect(isTruthyArray([1, true])).toBe(true);
        expect(isTruthyArray([1, 1])).toBe(true);
        expect(isTruthyArray([1, 1n])).toBe(true);
        expect(isTruthyArray([1, '1'])).toBe(true);
    });
});
