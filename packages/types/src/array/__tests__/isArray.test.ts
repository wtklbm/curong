import { isArray } from '..';

describe('@curong/types/isArray', () => {
    test('测试1', () => {
        expect(isArray(12)).toBe(false);
    });

    test('测试2', () => {
        expect(isArray([])).toBe(true);
    });

    test('测试3', () => {
        expect(isArray(null)).toBe(false);
    });

    test('测试4', () => {
        const fn = () => 1;
        expect(isArray(fn)).toBe(false);
    });
});
