import { isInt16 } from '..';

describe('@curong/types/isInt16', () => {
    test('测试1', () => {
        expect(isInt16(null)).toBe(false);
        expect(isInt16(undefined)).toBe(false);
        expect(isInt16('32767')).toBe(false);
        expect(isInt16('')).toBe(false);
        expect(isInt16(true)).toBe(false);
        expect(isInt16(false)).toBe(false);
        expect(isInt16({})).toBe(false);
        expect(isInt16([])).toBe(false);
    });

    test('测试2', () => {
        expect(isInt16(-32768)).toBe(true);
        expect(isInt16(0)).toBe(true);
        expect(isInt16(32767)).toBe(true);
        expect(isInt16(-32769)).toBe(false);
        expect(isInt16(32768)).toBe(false);
        expect(isInt16(123.45)).toBe(false);
    });
});
