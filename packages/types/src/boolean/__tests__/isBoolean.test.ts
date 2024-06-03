import { isBoolean } from '..';

describe('@curong/types/isBoolean', () => {
    test('测试1', () => {
        expect(isBoolean(12)).toBe(false);
    });

    test('测试2', () => {
        expect(isBoolean(true)).toBe(true);
        expect(isBoolean(false)).toBe(true);
        expect(isBoolean(new Boolean(false))).toBe(true);
    });

    test('测试3', () => {
        expect(isBoolean([1])).toBe(false);
    });
});
