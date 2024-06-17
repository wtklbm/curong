import { isUintSafeHave } from '..';

describe('@curong/types/isUintSafeHave', () => {
    test('测试1', () => {
        expect(isUintSafeHave(12.1)).toBe(false);
        expect(isUintSafeHave(Number.MAX_SAFE_INTEGER + 1)).toBe(false);
    });

    test('测试2', () => {
        expect(isUintSafeHave(0)).toBe(false);
        expect(isUintSafeHave(1)).toBe(true);
        expect(isUintSafeHave(Number.MAX_SAFE_INTEGER)).toBe(true);
    });
});
