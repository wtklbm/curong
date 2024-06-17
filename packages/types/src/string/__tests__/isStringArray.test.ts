import { isStringArray } from '..';

describe('@curong/types/isStringArray', () => {
    test('测试1', () => {
        expect(isStringArray([])).toBe(false);
        expect(isStringArray(0)).toBe(false);
        expect(isStringArray('')).toBe(false);
        expect(isStringArray('test')).toBe(false);
        expect(isStringArray(['test', 1])).toBe(false);
        expect(isStringArray(['test', true])).toBe(false);
    });

    test('测试2', () => {
        expect(isStringArray(['test'])).toBe(true);
        expect(isStringArray(['test', 'test'])).toBe(true);
    });
});
