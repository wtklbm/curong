import { isBigIntArray } from '..';

describe('@curong/types/isBigIntArray', () => {
    test('测试1', () => {
        expect(isBigIntArray(1)).toBe(false);
        expect(isBigIntArray([1])).toBe(false);
        expect(isBigIntArray([])).toBe(false);
        expect(isBigIntArray([1, 1])).toBe(false);
        expect(isBigIntArray([1, ''])).toBe(false);
    });

    test('测试2', () => {
        // @ts-ignore
        expect(isBigIntArray([1n])).toBe(true);

        // @ts-ignore
        expect(isBigIntArray([1n, 1])).toBe(false);
    });
});
