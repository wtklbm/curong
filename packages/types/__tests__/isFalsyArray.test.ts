import { isFalsyArray } from '../src';

describe('@curong/types/isFalsyArray', () => {
    test('测试1', () => {
        expect(isFalsyArray(false)).toBe(false);
        expect(isFalsyArray(0)).toBe(false);
        expect(isFalsyArray(-0)).toBe(false);
        expect(isFalsyArray(0n)).toBe(false);
        expect(isFalsyArray('')).toBe(false);
        expect(isFalsyArray('1')).toBe(false);
        expect(isFalsyArray(null)).toBe(false);
        expect(isFalsyArray(undefined)).toBe(false);
        expect(isFalsyArray(NaN)).toBe(false);
    });

    test('测试2', () => {
        expect(isFalsyArray([false])).toBe(true);
        expect(isFalsyArray([0])).toBe(true);
        expect(isFalsyArray([-0])).toBe(true);
        expect(isFalsyArray([0n])).toBe(true);
        expect(isFalsyArray([''])).toBe(true);
        expect(isFalsyArray(['1'])).toBe(false);
        expect(isFalsyArray([null])).toBe(true);
        expect(isFalsyArray([undefined])).toBe(true);
        expect(isFalsyArray([NaN])).toBe(true);
    });

    test('测试3', () => {
        expect(isFalsyArray([1, false])).toBe(false);
        expect(isFalsyArray([1, 0])).toBe(false);
        expect(isFalsyArray([1, -0])).toBe(false);
        expect(isFalsyArray([1, 0n])).toBe(false);
        expect(isFalsyArray([1, ''])).toBe(false);
        expect(isFalsyArray([1, '1'])).toBe(false);
        expect(isFalsyArray([1, null])).toBe(false);
        expect(isFalsyArray([1, undefined])).toBe(false);
        expect(isFalsyArray([1, NaN])).toBe(false);
    });
});
