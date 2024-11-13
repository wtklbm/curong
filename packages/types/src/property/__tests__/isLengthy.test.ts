import { isLengthy } from '..';

describe('@curong/types/isLengthy', () => {
    test('测试1', () => {
        expect(isLengthy(new Map())).toBe(false);
        expect(isLengthy(new Set())).toBe(false);
        expect(isLengthy({})).toBe(false);
        expect(isLengthy(null)).toBe(false);
        expect(isLengthy(undefined)).toBe(false);
    });

    test('测试2', () => {
        expect(isLengthy([])).toBe(true);
        expect(isLengthy('')).toBe(true);
        expect(isLengthy(new Function())).toBe(true);
    });
});
