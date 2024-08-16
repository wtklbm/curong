import { isNumberObject } from '..';

describe('@curong/types/isNumberObject', () => {
    test('测试1', () => {
        expect(isNumberObject(0)).toBe(false);

        expect(isNumberObject(NaN)).toBe(false);
        expect(isNumberObject(Number.NaN)).toBe(false);
        expect(isNumberObject(Number(NaN))).toBe(false);
        expect(isNumberObject(Number(Number.NaN))).toBe(false);
    });

    test('测试2', () => {
        expect(isNumberObject(new Number(1))).toBe(true);
        expect(isNumberObject(Object(1))).toBe(true);
        expect(isNumberObject(new Object(1))).toBe(true);

        expect(isNumberObject(new Number(NaN))).toBe(false);
        expect(isNumberObject(new Number(NaN), true)).toBe(true);
        expect(isNumberObject(new Number(NaN), false)).toBe(false);
        expect(isNumberObject(new Number(Number.NaN))).toBe(false);
        expect(isNumberObject(new Number(Number.NaN), true)).toBe(true);
        expect(isNumberObject(new Number(Number.NaN), false)).toBe(false);
    });

    test('测试3', () => {
        expect(isNumberObject(Object(NaN))).toBe(false);
        expect(isNumberObject(Object(NaN), true)).toBe(true);
        expect(isNumberObject(Object(NaN), false)).toBe(false);
        expect(isNumberObject(Object(Number.NaN))).toBe(false);
        expect(isNumberObject(Object(Number.NaN), true)).toBe(true);
        expect(isNumberObject(Object(Number.NaN), false)).toBe(false);
    });
});
