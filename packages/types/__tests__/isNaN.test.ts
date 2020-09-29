import { isNaN } from '../src';

describe('@curong/types/isNaN', () => {
    test('测试1', () => {
        expect(isNaN(12)).toBe(false);
    });

    test('测试2', () => {
        expect(isNaN(NaN)).toBe(true);
    });

    test('测试3', () => {
        expect(isNaN([1])).toBe(false);
    });
});
