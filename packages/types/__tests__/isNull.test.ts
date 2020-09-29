import { isNull } from '../src';

describe('@curong/types/isNull', () => {
    test('测试1', () => {
        expect(isNull(12)).toBe(false);
    });

    test('测试2', () => {
        expect(isNull(null)).toBe(true);
    });

    test('测试3', () => {
        expect(isNull([1])).toBe(false);
    });
});
