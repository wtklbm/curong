import { isNaN } from '../src';

describe('@curong/types/isNaN', () => {
    test('测试1', () => {
        expect(isNaN(12)).toBe(false);
        expect(isNaN(12, false)).toBe(false);
    });

    test('测试2', () => {
        expect(isNaN(NaN)).toBe(true);
        expect(isNaN(NaN, false)).toBe(true);
    });

    test('测试3', () => {
        expect(isNaN([1])).toBe(false);
        expect(isNaN([1], false)).toBe(false);

        expect(isNaN([1, 2])).toBe(true);
        expect(isNaN([1, 2], false)).toBe(false);

        expect(isNaN('中')).toBe(true);
        expect(isNaN('中', false)).toBe(false);
    });
});
