import { isNumberNaN } from '../src';

describe('@curong/types/isNumberNaN', () => {
    test('测试1', () => {
        expect(isNumberNaN(12)).toBe(false);
        // @ts-ignore
        expect(isNumberNaN(1n)).toBe(false);
        expect(isNumberNaN([1])).toBe(false);
        expect(isNumberNaN([1, 2])).toBe(false);
        expect(isNumberNaN('中')).toBe(false);
    });

    test('测试2', () => {
        expect(isNumberNaN(NaN)).toBe(true);
    });
});
