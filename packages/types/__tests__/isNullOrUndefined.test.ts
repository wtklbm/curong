import { isNullOrUndefined } from '../src';

describe('@curong/types/isNullOrUndefined', () => {
    test('测试1', () => {
        expect(isNullOrUndefined(12)).toBe(false);
    });

    test('测试2', () => {
        expect(isNullOrUndefined(null)).toBe(true);
        expect(isNullOrUndefined(undefined)).toBe(true);
    });

    test('测试3', () => {
        expect(isNullOrUndefined([1])).toBe(false);
    });
});
