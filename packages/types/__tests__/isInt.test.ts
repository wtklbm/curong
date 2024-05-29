import { isInt } from '../src';

describe('@curong/types/isInt', () => {
    test('测试1', () => {
        expect(isInt([1])).toBe(false);
        expect(isInt(12.1)).toBe(false);
        expect(isInt(NaN)).toBe(false);
        expect(isInt(Number.NaN)).toBe(false);
        expect(isInt(Infinity)).toBe(false);
        expect(isInt(-Infinity)).toBe(false);
        expect(isInt(Number.MAX_VALUE)).toBe(true); // 是个整数
        expect(isInt(Number.MIN_VALUE)).toBe(false);
    });

    test('测试2', () => {
        expect(isInt(0)).toBe(true);
        expect(isInt(-0)).toBe(true);
        expect(isInt(1.0)).toBe(true); // 自动转换为 0，是弱类型语言的问题
        expect(isInt(-1.0)).toBe(true); // 自动转换为 0，是弱类型语言的问题
        expect(isInt(15)).toBe(true);
        expect(isInt(-15)).toBe(true);
        expect(isInt(Number.MAX_SAFE_INTEGER)).toBe(true);
        expect(isInt(Number.MIN_SAFE_INTEGER)).toBe(true);
    });
});
