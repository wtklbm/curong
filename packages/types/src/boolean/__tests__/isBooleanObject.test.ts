import { isBooleanObject } from '..';

describe('@curong/types/isBooleanObject', () => {
    test('测试1', () => {
        expect(isBooleanObject(false)).toBe(false);
    });

    test('测试2', () => {
        expect(isBooleanObject(Boolean(false))).toBe(false);
        expect(isBooleanObject(new Boolean(false))).toBe(true);
        expect(isBooleanObject(Object(false))).toBe(true);
        expect(isBooleanObject(new Object(false))).toBe(true);
    });
});
