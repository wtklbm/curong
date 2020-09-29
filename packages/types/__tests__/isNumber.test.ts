import { isNumber } from '../src';

describe('@curong/types/isNumber', () => {
    test('测试1', () => {
        expect(isNumber('12')).toBe(false);
    });

    test('测试2', () => {
        expect(isNumber(12)).toBe(true);
    });

    test('测试3', () => {
        expect(isNumber([1])).toBe(false);
    });
});
