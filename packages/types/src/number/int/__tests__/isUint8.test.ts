import { isUint8 } from '..';

describe('@curong/types/isUint8', () => {
    test('测试1', () => {
        expect(isUint8(null)).toBe(false);
        expect(isUint8(undefined)).toBe(false);
        expect(isUint8('255')).toBe(false);
        expect(isUint8('')).toBe(false);
        expect(isUint8(true)).toBe(false);
        expect(isUint8(false)).toBe(false);
        expect(isUint8({})).toBe(false);
        expect(isUint8([])).toBe(false);
    });

    test('测试', () => {
        expect(isUint8(0)).toBe(true);
        expect(isUint8(255)).toBe(true);
        expect(isUint8(256)).toBe(false);
        expect(isUint8(-1)).toBe(false);
        expect(isUint8(123.45)).toBe(false);
    });
});
