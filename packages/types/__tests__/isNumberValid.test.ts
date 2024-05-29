import { isNumberValid } from '../src';

describe('@curong/types/isNumberValid', () => {
    test('测试1', () => {
        expect(isNumberValid(undefined)).toBe(false);
        expect(isNumberValid('abc')).toBe(false);
        expect(isNumberValid('123abc')).toBe(false);
        expect(isNumberValid('NaN')).toBe(false);
        expect(isNumberValid('123 ')).toBe(true);
        expect(isNumberValid('', true)).toBe(true);
        expect(isNumberValid(' ', true)).toBe(true);
    });

    test('测试2', () => {
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
    });
});
