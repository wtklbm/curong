import { isArrayIndex } from '../src';

describe('@curong/types/isArrayIndex', () => {
    test('测试1', () => {
        expect(isArrayIndex(12.3)).toBe(false);
    });

    test('测试2', () => {
        expect(isArrayIndex(0)).toBe(true);
        expect(isArrayIndex(2 ** 32 - 1)).toBe(true);
    });

    test('测试3', () => {
        expect(isArrayIndex(2 ** 32)).toBe(false);
        expect(isArrayIndex(2 ** 32 + 1)).toBe(false);
        expect(isArrayIndex([1])).toBe(false);
    });
});
