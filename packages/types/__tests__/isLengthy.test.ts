import { isLengthy } from '../src';

describe('@curong/types/isLengthy', () => {
    test('测试1', () => {
        expect(isLengthy(new Map())).toBe(false);
        expect(isLengthy(new Set())).toBe(false);
        expect(isLengthy({})).toBe(false);
    });

    test('测试2', () => {
        expect(isLengthy([])).toBe(true);
        expect(isLengthy('')).toBe(true);
        expect(isLengthy(new Function())).toBe(true);
    });
});
