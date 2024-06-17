import { isUint16 } from '..';

describe('@curong/types/isUint16', () => {
    test('测试1', () => {
        expect(isUint16(null)).toBe(false);
        expect(isUint16(undefined)).toBe(false);
        expect(isUint16('65535')).toBe(false);
        expect(isUint16('')).toBe(false);
        expect(isUint16(true)).toBe(false);
        expect(isUint16(false)).toBe(false);
        expect(isUint16({})).toBe(false);
        expect(isUint16([])).toBe(false);
    });
    test('测试', () => {
        expect(isUint16(0)).toBe(true);
        expect(isUint16(65535)).toBe(true);
        expect(isUint16(65536)).toBe(false);
        expect(isUint16(-1)).toBe(false);
        expect(isUint16(123.45)).toBe(false);
    });
});
