import { isFunction } from '../src';

describe('@curong/types/isFunction', () => {
    test('测试1', () => {
        expect(isFunction(12)).toBe(false);
    });

    test('测试2', () => {
        expect(isFunction(new Function())).toBe(true);
    });

    test('测试3', () => {
        expect(isFunction([1])).toBe(false);
    });
});
