import { isFalse } from '..';

describe('@curong/types/isFalse', () => {
    test('测试1', () => {
        expect(isFalse(12)).toBe(false);
        expect(isFalse(true)).toBe(false);
        expect(isFalse(false)).toBe(true);
    });

    test('测试2', () => {
        expect(isFalse(Boolean(false))).toBe(true);
        expect(isFalse(new Boolean(false))).toBe(false);
        expect(isFalse(Object(false))).toBe(false);
        expect(isFalse(new Object(false))).toBe(false);
    });
});
