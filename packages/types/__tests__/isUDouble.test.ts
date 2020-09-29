import { isUDouble } from '../src';

describe('@curong/types/isUDouble', () => {
    test('测试1', () => {
        expect(isUDouble(12.0)).toBe(false);
        expect(isUDouble(-12.0)).toBe(false);
        expect(isUDouble(-1)).toBe(false);
        expect(isUDouble(Math.pow(2, 52) + 0.1)).toBe(false);
        expect(isUDouble(Math.pow(2, 52) - 0.25)).toBe(false);
    });

    test('测试2', () => {
        expect(isUDouble(0.0001)).toBe(true);
        expect(isUDouble(15.2)).toBe(true);
        expect(isUDouble(Math.pow(2, 52) - 0.251)).toBe(true);
    });
});
