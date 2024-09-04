import { toInt } from '../src';

describe('@curong/number/toInt', () => {
    test('整数输入', () => {
        expect(toInt(42)).toBe(42);
        expect(toInt(-42)).toBe(-42);
    });

    test('浮点数输入', () => {
        expect(toInt(42.8)).toBe(42);
        expect(toInt(-42.8)).toBe(-43);
    });

    test('字符串数字输入', () => {
        expect(toInt('42')).toBe(42);
        expect(toInt('-42')).toBe(-42);
        expect(toInt('42.8')).toBe(42);
        expect(toInt('-42.8')).toBe(-43);
    });

    test('空字符串输入', () => {
        expect(() => toInt('')).toThrow('[toInt] value 不能为空字符串');
        expect(() => toInt('    ')).toThrow('[toInt] value 不能为空字符串');
    });

    test('非数字字符串输入', () => {
        expect(() => toInt('abc')).toThrow(
            '[toInt] value 转换为数字后不能为 NaN 或正负 Infinity: abc'
        );
    });

    test('NaN 输入', () => {
        expect(() => toInt(NaN)).toThrow(
            '[toInt] value 转换为数字后不能为 NaN 或正负 Infinity: NaN'
        );
    });

    test('Infinity 输入', () => {
        expect(() => toInt(Infinity)).toThrow(
            '[toInt] value 转换为数字后不能为 NaN 或正负 Infinity: Infinity'
        );
        expect(() => toInt(-Infinity)).toThrow(
            '[toInt] value 转换为数字后不能为 NaN 或正负 Infinity: -Infinity'
        );
    });

    test('极大和极小数值输入', () => {
        expect(toInt(Number.MAX_SAFE_INTEGER)).toBe(Number.MAX_SAFE_INTEGER);
        expect(toInt(Number.MIN_SAFE_INTEGER)).toBe(Number.MIN_SAFE_INTEGER);
        expect(toInt(Number.MAX_VALUE)).toBe(Math.floor(Number.MAX_VALUE));
        expect(toInt(Number.MIN_VALUE)).toBe(0);
    });

    test('边界情况', () => {
        expect(toInt(0)).toBe(0);
        expect(toInt(-0)).toBe(-0);
        expect(toInt('0')).toBe(0);
        expect(toInt('-0')).toBe(-0);
    });
});
