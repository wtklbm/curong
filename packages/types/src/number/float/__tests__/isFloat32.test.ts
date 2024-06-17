import { isFloat32 } from '..';

describe('@curong/types/isFloat32', () => {
    test('测试1', () => {
        expect(isFloat32(0)).toBe(false);
        expect(isFloat32(null)).toBe(false);
        expect(isFloat32(undefined)).toBe(false);
        expect(isFloat32('123.45')).toBe(false);
        expect(isFloat32('')).toBe(false);
        expect(isFloat32(true)).toBe(false);
        expect(isFloat32(false)).toBe(false);
        expect(isFloat32({})).toBe(false);
        expect(isFloat32([])).toBe(false);
    });

    test('测试2', () => {
        // `3.4028234663852886e+38` 是一个整数
        expect(isFloat32(3.4028234663852886e38)).toBe(false);
        expect(isFloat32(-3.4028234663852886e38)).toBe(false);
    });

    test('测试3', () => {
        expect(isFloat32(-3.4028234663852886e39)).toBe(false);
        expect(isFloat32(3.4028234663852886e39)).toBe(false);
    });

    test('测试4', () => {
        expect(isFloat32(123.45)).toBe(true);
    });
});
