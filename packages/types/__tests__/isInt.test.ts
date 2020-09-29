import { isInt } from '../src';

describe('@curong/types/isInt', () => {
    test('测试1', () => {
        expect(isInt(12.1)).toBe(false);
    });

    test('测试2', () => {
        expect(isInt(15)).toBe(true);
    });

    test('测试3', () => {
        expect(isInt([1])).toBe(false);
    });
});
