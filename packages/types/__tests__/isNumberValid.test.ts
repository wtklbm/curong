import { isNumberValid } from '../src';

describe('@curong/types/isNumberValid', () => {
    test('测试1', () => {
        expect(isNumberValid(undefined)).toBe(false);
        expect(isNumberValid('abc')).toBe(false);
        expect(isNumberValid('123abc')).toBe(false);
        expect(isNumberValid('NaN')).toBe(false);
        expect(isNumberValid('')).toBe(false);
        expect(isNumberValid('11 23')).toBe(false);
        expect(isNumberValid('MIN_VALUE')).toBe(false);
        expect(isNumberValid('Number.MIN_VALUE')).toBe(false);
        expect(isNumberValid('POSITIVE_INFINITY')).toBe(false);
        expect(isNumberValid('xxx')).toBe(false);
        expect(isNumberValid(NaN)).toBe(false);
        expect(isNumberValid(Number.NaN)).toBe(false);
        expect(isNumberValid(Number.NaN + '')).toBe(false);
        expect(isNumberValid(true + '')).toBe(false);
    });

    test('测试2', () => {
        expect(isNumberValid('123 ')).toBe(true);
        expect(isNumberValid('', true)).toBe(true);
        expect(isNumberValid(' ', true)).toBe(true);
        expect(isNumberValid(true)).toBe(true);
        expect(isNumberValid(1)).toBe(true);
        expect(isNumberValid(Number(1))).toBe(true);
        expect(isNumberValid(new Number(1))).toBe(true);
        expect(isNumberValid(Object(1))).toBe(true);
        expect(isNumberValid(0)).toBe(true);
        expect(isNumberValid(11.23)).toBe(true);
        expect(isNumberValid(null)).toBe(true);
        expect(isNumberValid('123')).toBe(true);
        expect(isNumberValid(' 123 ')).toBe(true);
        expect(isNumberValid('0')).toBe(true);
        expect(isNumberValid('-123')).toBe(true);
        expect(isNumberValid('123.45')).toBe(true);
        expect(isNumberValid('-123.45')).toBe(true);
        expect(isNumberValid('123 ')).toBe(true); // 去掉空格后的数字仍然有效
        expect(isNumberValid(' 123 ')).toBe(true); // 去掉空格后的数字仍然有效
        expect(isNumberValid('Infinity')).toBe(true); // Infinity 是有效数字
        expect(isNumberValid('-Infinity')).toBe(true); // -Infinity 是有效数字
        expect(isNumberValid('', false)).toBe(false);
        expect(isNumberValid(' ', false)).toBe(false);

        expect(isNumberValid('Infinity')).toBe(true);
        expect(isNumberValid('-Infinity')).toBe(true);
        expect(isNumberValid(`${Number.POSITIVE_INFINITY}`)).toBe(true);
        expect(isNumberValid('1')).toBe(true);
        expect(isNumberValid(`${Number(1)}`)).toBe(true);
        expect(isNumberValid(new Number(1) + '')).toBe(true);
        expect(isNumberValid(Object(1) + '')).toBe(true);
        expect(isNumberValid(Number(1) + '')).toBe(true);
        expect(isNumberValid(0 + '')).toBe(true);
        expect(isNumberValid(11.23 + '')).toBe(true);
        expect(isNumberValid('11.23')).toBe(true);
    });
});
