import { isFloat32SafeInt } from '..';

describe('@curong/types/isFloat32SafeInt', () => {
    test('测试1', () => {
        expect(isFloat32SafeInt(null)).toBe(false);
        expect(isFloat32SafeInt(undefined)).toBe(false);
        expect(isFloat32SafeInt('16777215')).toBe(false);
        expect(isFloat32SafeInt('')).toBe(false);
        expect(isFloat32SafeInt(true)).toBe(false);
        expect(isFloat32SafeInt(false)).toBe(false);
        expect(isFloat32SafeInt({})).toBe(false);
        expect(isFloat32SafeInt([])).toBe(false);
    });

    test('测试2', () => {
        expect(isFloat32SafeInt(-16777215)).toBe(true);
        expect(isFloat32SafeInt(0)).toBe(true);
        expect(isFloat32SafeInt(16777215)).toBe(true);
        expect(isFloat32SafeInt(-16777216)).toBe(false);
        expect(isFloat32SafeInt(16777216)).toBe(false);
        expect(isFloat32SafeInt(123456.789)).toBe(false);
    });
});
