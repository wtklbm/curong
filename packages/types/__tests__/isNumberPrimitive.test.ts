import { isNumberPrimitive } from '../src';

describe('@curong/types/isNumberPrimitive', () => {
    test('测试1', () => {
        expect(isNumberPrimitive(new Number(1))).toBe(false);
    });

    test('测试2', () => {
        expect(isNumberPrimitive(1)).toBe(true);
    });
});
