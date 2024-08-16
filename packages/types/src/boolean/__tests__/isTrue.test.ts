import { isTrue } from '..';

describe('@curong/types/isTrue', () => {
    test('测试1', () => {
        expect(isTrue(12)).toBe(false);
        expect(isTrue(true)).toBe(true);
        expect(isTrue(false)).toBe(false);
    });

    test('测试2', () => {
        expect(isTrue(Boolean(true))).toBe(true);
        expect(isTrue(new Boolean(true))).toBe(false);
        expect(isTrue(Object(true))).toBe(false);
        expect(isTrue(new Object(true))).toBe(false);
    });
});
