import { isNumberFinite } from '../src';

describe('@curong/types/isNumberFinite', () => {
    test('测试1', () => {
        // @ts-ignore
        expect(isNumberFinite(1n)).toBe(false);
        expect(isNumberFinite('中')).toBe(false);
    });

    test('测试2', () => {
        expect(isNumberFinite(NaN)).toBe(false);
        expect(isNumberFinite(Number.NaN)).toBe(false);
        expect(isNumberFinite(Infinity)).toBe(false);
        expect(isNumberFinite(-Infinity)).toBe(false);
    });

    test('测试3', () => {
        expect(isNumberFinite(Number.MAX_VALUE)).toBe(true);
        expect(isNumberFinite(Number.MIN_VALUE)).toBe(true);
        expect(isNumberFinite(Number.MIN_SAFE_INTEGER)).toBe(true);
        expect(isNumberFinite(Number.MAX_SAFE_INTEGER)).toBe(true);
        expect(isNumberFinite(Number.MAX_SAFE_INTEGER)).toBe(true);
    });

    test('测试3', () => {
        expect(isNumberFinite(0)).toBe(true);
        expect(isNumberFinite('0')).toBe(false);
        expect(isNumberFinite(-1)).toBe(true);
        expect(isNumberFinite('-1')).toBe(false);
        expect(isNumberFinite([1])).toBe(false);
        expect(isNumberFinite([1, 2])).toBe(false);
    });
});
