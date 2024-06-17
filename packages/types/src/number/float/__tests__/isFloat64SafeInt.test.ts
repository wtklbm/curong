import { isFloat64SafeInt } from '..';

describe('@curong/types/isFloat64SafeInt', () => {
    test('测试1', () => {
        expect(isFloat64SafeInt(null)).toBe(false);
        expect(isFloat64SafeInt(undefined)).toBe(false);
        expect(isFloat64SafeInt('9007199254740991')).toBe(false);
        expect(isFloat64SafeInt('')).toBe(false);
        expect(isFloat64SafeInt(true)).toBe(false);
        expect(isFloat64SafeInt(false)).toBe(false);
        expect(isFloat64SafeInt({})).toBe(false);
        expect(isFloat64SafeInt([])).toBe(false);
    });

    test('测试2', () => {
        expect(isFloat64SafeInt(-9007199254740991)).toBe(true);
        expect(isFloat64SafeInt(0)).toBe(true);
        expect(isFloat64SafeInt(9007199254740991)).toBe(true);
        expect(isFloat64SafeInt(-9007199254740992)).toBe(false);
        expect(isFloat64SafeInt(9007199254740992)).toBe(false);
        expect(isFloat64SafeInt(123456789.987654321)).toBe(false);
    });
});
