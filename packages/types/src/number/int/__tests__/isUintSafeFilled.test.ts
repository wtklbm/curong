import { isUintSafeFilled } from '..';

describe('@curong/types/isUintSafeFilled', () => {
    test('测试1', () => {
        expect(isUintSafeFilled(12.1)).toBe(false);
        expect(isUintSafeFilled(Number.MAX_SAFE_INTEGER + 1)).toBe(false);
    });

    test('测试2', () => {
        expect(isUintSafeFilled(0)).toBe(false);
        expect(isUintSafeFilled(1)).toBe(true);
        expect(isUintSafeFilled(Number.MAX_SAFE_INTEGER)).toBe(true);
    });
});
