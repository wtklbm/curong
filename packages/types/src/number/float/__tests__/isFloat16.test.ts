import { isFloat16 } from '..';

describe('@curong/types/isFloat16', () => {
    test('测试1', () => {
        expect(isFloat16(0)).toBe(false);
        expect(isFloat16(-65504)).toBe(false);
        expect(isFloat16(65504)).toBe(false);
    });

    test('测试2', () => {
        expect(isFloat16(-70000)).toBe(false);
        expect(isFloat16(70000)).toBe(false);
    });

    test('测试3', () => {
        expect(isFloat16('string')).toBe(false);
        expect(isFloat16(null)).toBe(false);
        expect(isFloat16(undefined)).toBe(false);
        expect(isFloat16({})).toBe(false);
        expect(isFloat16([])).toBe(false);
    });

    test('测试4', () => {
        expect(isFloat16(12345.678)).toBe(true);
        expect(isFloat16(-12345.678)).toBe(true);
        expect(isFloat16(65503.9999)).toBe(true);
        expect(isFloat16(-65503.9999)).toBe(true);
    });

    test('测试5', () => {
        expect(isFloat16(65504.0001)).toBe(false);
        expect(isFloat16(-65504.0001)).toBe(false);
    });
});
