import { stringify } from '../src';

describe('@curong/number/stringify', () => {
    test('0 应该转换为 "0"', () => {
        expect(stringify(0)).toBe('0');
    });

    test('-0 应该转换为 "-0"', () => {
        expect(stringify(-0)).toBe('-0');
    });

    test('正无穷大应该转换为 "Infinity"', () => {
        expect(stringify(Number.POSITIVE_INFINITY)).toBe('Infinity');
    });

    test('负无穷大应该转换为 "-Infinity"', () => {
        expect(stringify(Number.NEGATIVE_INFINITY)).toBe('-Infinity');
    });

    test('NaN 应该转换为 "NaN"', () => {
        expect(stringify(NaN)).toBe('NaN');
    });

    test('普通数字 42 应该转换为 "42"', () => {
        expect(stringify(42)).toBe('42');
    });

    test('负数 -42 应该转换为 "-42"', () => {
        expect(stringify(-42)).toBe('-42');
    });

    test('小数 3.14 应该转换为 "3.14"', () => {
        expect(stringify(3.14)).toBe('3.14');
    });

    test('负小数 -3.14 应该转换为 "-3.14"', () => {
        expect(stringify(-3.14)).toBe('-3.14');
    });
});
