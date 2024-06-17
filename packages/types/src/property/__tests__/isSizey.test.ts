import { isSizey } from '..';

describe('@curong/types/isSizey', () => {
    test('测试1', () => {
        expect(isSizey(null)).toBe(false);
        expect(isSizey(undefined)).toBe(false);
        expect(isSizey([])).toBe(false);
        expect(isSizey('')).toBe(false);
        expect(isSizey(new Function())).toBe(false);
    });

    test('测试2', () => {
        expect(isSizey(new Map())).toBe(true);
        expect(isSizey(new Set())).toBe(true);
        expect(isSizey({ size: 0 })).toBe(true);
    });
});
