import { isFloat64 } from '..';

describe('@curong/types/isFloat64', () => {
    test('测试1', () => {
        expect(isFloat64(null)).toBe(false);
        expect(isFloat64(undefined)).toBe(false);
        expect(isFloat64('12345.6789')).toBe(false);
        expect(isFloat64('')).toBe(false);
        expect(isFloat64(true)).toBe(false);
        expect(isFloat64(false)).toBe(false);
        expect(isFloat64({})).toBe(false);
        expect(isFloat64([])).toBe(false);
    });

    test('测试2', () => {
        expect(isFloat64(0)).toBe(false);
        expect(isFloat64(-1.7976931348623157e308)).toBe(false);
        expect(isFloat64(1.7976931348623157e308)).toBe(false);
        expect(isFloat64(-1.7976931348623157e309)).toBe(false);
        expect(isFloat64(1.7976931348623157e309)).toBe(false);

        expect(isFloat64(12345.6789)).toBe(true);
    });
});
