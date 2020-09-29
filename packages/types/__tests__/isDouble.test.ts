import { isDouble } from '../src';

describe('@curong/types/isDouble', () => {
    test('测试1', () => {
        expect(isDouble(12.0)).toBe(false);
        expect(isDouble(Math.pow(2, 52) + 0.1)).toBe(false);
        expect(isDouble(Math.pow(2, 52) - 0.25)).toBe(false);
    });

    test('测试2', () => {
        expect(isDouble(0.0001)).toBe(true);
        expect(isDouble(15.2)).toBe(true);
        expect(isDouble(Math.pow(2, 52) - 0.251)).toBe(true);
    });
});
