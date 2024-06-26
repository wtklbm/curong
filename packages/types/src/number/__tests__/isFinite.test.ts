import { isFinite } from '..';

describe('@curong/types/isFinite', () => {
    test('测试1', () => {
        expect(isFinite(1n)).toBe(false);
        expect(isFinite('中')).toBe(false);
    });

    test('测试2', () => {
        expect(isFinite(NaN)).toBe(false);
        expect(isFinite(Number.NaN)).toBe(false);
        expect(isFinite(Infinity)).toBe(false);
        expect(isFinite(-Infinity)).toBe(false);
    });

    test('测试3', () => {
        expect(isFinite(Number.MAX_VALUE)).toBe(true);
        expect(isFinite(-Number.MAX_VALUE)).toBe(true);
        expect(isFinite(Number.MIN_VALUE)).toBe(true);
        expect(isFinite(-Number.MIN_VALUE)).toBe(true);
        expect(isFinite(Number.MIN_SAFE_INTEGER)).toBe(true);
        expect(isFinite(-Number.MIN_SAFE_INTEGER)).toBe(true);
        expect(isFinite(Number.MAX_SAFE_INTEGER)).toBe(true);
        expect(isFinite(-Number.MAX_SAFE_INTEGER)).toBe(true);
    });

    test('测试3', () => {
        expect(isFinite(0)).toBe(true);
        expect(isFinite('0')).toBe(false);
        expect(isFinite(-1)).toBe(true);
        expect(isFinite('-1')).toBe(false);
        expect(isFinite([1])).toBe(false);
        expect(isFinite([1, 2])).toBe(false);

        expect(isFinite(0, true)).toBe(true);
        expect(isFinite('0', true)).toBe(true);
        expect(isFinite(-1, true)).toBe(true);
        expect(isFinite('-1', true)).toBe(true);
        expect(isFinite([1], true)).toBe(true);
        expect(isFinite([1, 2], true)).toBe(false);

        expect(isFinite(0, false)).toBe(true);
        expect(isFinite('0', false)).toBe(false);
        expect(isFinite(-1, false)).toBe(true);
        expect(isFinite('-1', false)).toBe(false);
        expect(isFinite([1], false)).toBe(false);
        expect(isFinite([1, 2], false)).toBe(false);
    });
});
