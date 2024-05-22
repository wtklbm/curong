import { isFunctionArray } from '../src';

describe('@curong/types/isFunctionArray', () => {
    test('测试1', () => {
        expect(isFunctionArray([])).toBe(false);
        expect(isFunctionArray(0)).toBe(false);
        expect(isFunctionArray('')).toBe(false);
        expect(isFunctionArray(2)).toBe(false);
        expect(isFunctionArray([2, '1'])).toBe(false);
        expect(isFunctionArray([2, true])).toBe(false);
    });

    test('测试2', () => {
        expect(isFunctionArray([() => 1])).toBe(true);
        expect(isFunctionArray([() => 0, true])).toBe(false);
        expect(isFunctionArray([() => 1, async () => 1])).toBe(true);
    });
});
