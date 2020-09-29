import { isUintSafe } from '../src';

describe('@curong/types/isUintSafe', () => {
    test('测试1', () => {
        expect(isUintSafe(12.1)).toBe(false);
        expect(isUintSafe(Number.MAX_SAFE_INTEGER + 1)).toBe(false);
    });

    test('测试2', () => {
        expect(isUintSafe(0)).toBe(true);
        expect(isUintSafe(Number.MAX_SAFE_INTEGER)).toBe(true);
    });
});
