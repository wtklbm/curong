import { isNumberPrimitive } from '..';

describe('@curong/types/isNumberPrimitive', () => {
    test('测试1', () => {
        expect(isNumberPrimitive(new Number(1))).toBe(false);
        expect(isNumberPrimitive(Object(1))).toBe(false);
        expect(isNumberPrimitive(new Object(1))).toBe(false);
    });

    test('测试2', () => {
        expect(isNumberPrimitive(1)).toBe(true);
        expect(isNumberPrimitive(Number(1))).toBe(true);
    });

    test('测试3', () => {
        expect(isNumberPrimitive(NaN)).toBe(false);
        expect(isNumberPrimitive(NaN, true)).toBe(true);
        expect(isNumberPrimitive(NaN, false)).toBe(false);
        expect(isNumberPrimitive(Number.NaN)).toBe(false);
        expect(isNumberPrimitive(Number.NaN, true)).toBe(true);
        expect(isNumberPrimitive(Number.NaN, false)).toBe(false);
    });
});
