import { isArrayIndex, MAX_ARRAY_LENGTH } from '../src';

describe('@curong/types/isArrayIndex', () => {
    test('测试1', () => {
        expect(isArrayIndex(12.3)).toBe(false);
    });

    test('测试2', () => {
        expect(isArrayIndex(0)).toBe(true);
        expect(isArrayIndex(MAX_ARRAY_LENGTH)).toBe(true);
    });

    test('测试3', () => {
        expect(isArrayIndex(MAX_ARRAY_LENGTH + 1)).toBe(false);
        expect(isArrayIndex([1])).toBe(false);
    });
});
