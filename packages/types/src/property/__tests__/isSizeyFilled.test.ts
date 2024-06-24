import { isSizeyFilled } from '..';

describe('@curong/types/isSizeyFilled', () => {
    test('测试1', () => {
        expect(isSizeyFilled(null)).toBe(false);
        expect(isSizeyFilled(undefined)).toBe(false);
        expect(isSizeyFilled([])).toBe(false);
        expect(isSizeyFilled('')).toBe(false);
        expect(isSizeyFilled(new Function())).toBe(false);
        expect(isSizeyFilled(new Map())).toBe(false);
        expect(isSizeyFilled(new Set())).toBe(false);
        expect(isSizeyFilled({ size: 0 })).toBe(false);
    });

    test('测试2', () => {
        expect(isSizeyFilled(new Map([[1, 1]]))).toBe(true);
        expect(isSizeyFilled(new Set([1]))).toBe(true);
        expect(isSizeyFilled({ size: 1 })).toBe(true);
    });
});
