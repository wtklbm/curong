import { isSizeyHave } from '..';

describe('@curong/types/isSizeyHave', () => {
    test('测试1', () => {
        expect(isSizeyHave(null)).toBe(false);
        expect(isSizeyHave(undefined)).toBe(false);
        expect(isSizeyHave([])).toBe(false);
        expect(isSizeyHave('')).toBe(false);
        expect(isSizeyHave(new Function())).toBe(false);
        expect(isSizeyHave(new Map())).toBe(false);
        expect(isSizeyHave(new Set())).toBe(false);
        expect(isSizeyHave({ size: 0 })).toBe(false);
    });

    test('测试2', () => {
        expect(isSizeyHave(new Map([[1, 1]]))).toBe(true);
        expect(isSizeyHave(new Set([1]))).toBe(true);
        expect(isSizeyHave({ size: 1 })).toBe(true);
    });
});
