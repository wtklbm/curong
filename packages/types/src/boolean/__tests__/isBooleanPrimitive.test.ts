import { isBooleanPrimitive } from '..';

describe('@curong/types/isBooleanPrimitive', () => {
    test('测试1', () => {
        expect(isBooleanPrimitive(new Boolean(false))).toBe(false);
        expect(isBooleanPrimitive(Object(false))).toBe(false);
        expect(isBooleanPrimitive(new Object(false))).toBe(false);
    });

    test('测试2', () => {
        expect(isBooleanPrimitive(true)).toBe(true);
        expect(isBooleanPrimitive(Boolean(true))).toBe(true);
    });
});
