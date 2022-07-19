import { isPropertyKey } from '../src';

describe('@curong/types/isPropertyKey', () => {
    test('测试1', () => {
        expect(isPropertyKey(null)).toBe(false);
        expect(isPropertyKey(undefined)).toBe(false);
        expect(isPropertyKey(function () {})).toBe(false);
        expect(isPropertyKey([])).toBe(false);
        expect(isPropertyKey({})).toBe(false);
        expect(isPropertyKey(new Error())).toBe(false);
    });

    test('测试2', () => {
        // 空字符串也可以
        expect(isPropertyKey('')).toBe(true);
        expect(isPropertyKey(0)).toBe(true);
        expect(isPropertyKey(Symbol('x'))).toBe(true);

        // 以下值在作为属性对象时必须使用 `[xxx]: value` 语法来定义
        expect(isPropertyKey(NaN)).toBe(true);
        expect(isPropertyKey(Infinity)).toBe(true);
        expect(isPropertyKey(Number.POSITIVE_INFINITY)).toBe(true);
        expect(isPropertyKey(Number.NEGATIVE_INFINITY)).toBe(true);
        expect(isPropertyKey(Number.MIN_VALUE)).toBe(true);
        expect(isPropertyKey(Number.MAX_SAFE_INTEGER)).toBe(true);
        expect(isPropertyKey(Number.MIN_SAFE_INTEGER)).toBe(true);
        expect(isPropertyKey(Number.EPSILON)).toBe(true);
        expect(isPropertyKey(-1)).toBe(true);
        expect(isPropertyKey(-1.1)).toBe(true);
        expect(isPropertyKey(1.1)).toBe(true);
    });
});
