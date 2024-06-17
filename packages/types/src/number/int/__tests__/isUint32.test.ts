import { isUint32 } from '..';

describe('@curong/types/isUint32', () => {
    test('测试1', () => {
        expect(isUint32(null)).toBe(false);
        expect(isUint32(undefined)).toBe(false);
        expect(isUint32('4294967295')).toBe(false);
        expect(isUint32('')).toBe(false);
        expect(isUint32(true)).toBe(false);
        expect(isUint32(false)).toBe(false);
        expect(isUint32({})).toBe(false);
        expect(isUint32([])).toBe(false);
    });
    test('测试2', () => {
        expect(isUint32(0)).toBe(true);
        expect(isUint32(4294967295)).toBe(true);
        expect(isUint32(4294967296)).toBe(false);
        expect(isUint32(-1)).toBe(false);
        expect(isUint32(123.45)).toBe(false);
    });
});
