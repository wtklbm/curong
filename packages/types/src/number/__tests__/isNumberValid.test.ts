import { isNumberValid } from '..';

describe('@curong/types/isNumberValid', () => {
    test('测试1', () => {
        expect(isNumberValid(undefined)).toBe(false);
        expect(isNumberValid({})).toBe(false);

        expect(isNumberValid('abc')).toBe(false);
        expect(isNumberValid('123abc')).toBe(false);
        expect(isNumberValid('NaN')).toBe(false);
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
        expect(isNumberValid(1)).toBe(true);
        expect(isNumberValid(Number(1))).toBe(true);
        expect(isNumberValid(new Number(1))).toBe(true);
        expect(isNumberValid(Object(1))).toBe(true);
        expect(isNumberValid(0)).toBe(true);
        expect(isNumberValid(-0)).toBe(true);
        expect(isNumberValid(0n)).toBe(true);
        expect(isNumberValid(11.23)).toBe(true);
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

    test('测试3', () => {
        expect(isNumberValid(true)).toBe(true);
        expect(isNumberValid(false)).toBe(true);
        expect(isNumberValid('')).toBe(true);
        expect(isNumberValid(' ')).toBe(true);
        expect(isNumberValid([])).toBe(true);
        expect(isNumberValid(null)).toBe(true);
        expect(isNumberValid(NaN)).toBe(false);
        expect(isNumberValid(Number.NaN)).toBe(false);
        //@ts-ignore
        expect(isNumberValid(1n)).toBe(true);

        expect(isNumberValid(true, true)).toBe(true);
        expect(isNumberValid(false, true)).toBe(true);
        expect(isNumberValid('', true)).toBe(true);
        expect(isNumberValid(' ', true)).toBe(true);
        expect(isNumberValid([], true)).toBe(true);
        expect(isNumberValid(null, true)).toBe(true);
        expect(isNumberValid(NaN, true)).toBe(false);
        expect(isNumberValid(Number.NaN, true)).toBe(false);
        //@ts-ignore
        expect(isNumberValid(1n, true)).toBe(true);

        expect(isNumberValid(true, false)).toBe(false);
        expect(isNumberValid(false, false)).toBe(false);
        expect(isNumberValid('', false)).toBe(false);
        expect(isNumberValid(' ', false)).toBe(false);
        expect(isNumberValid([], false)).toBe(false);
        expect(isNumberValid(null, false)).toBe(false);
        expect(isNumberValid(NaN, false)).toBe(false);
        expect(isNumberValid(Number.NaN, false)).toBe(false);
        //@ts-ignore
        expect(isNumberValid(1n, false)).toBe(false);
    });

    test('测试4', () => {
        expect(isNumberValid(NaN, true)).toBe(false);
        expect(isNumberValid(Number.NaN, true)).toBe(false);

        expect(isNumberValid(NaN, true, true)).toBe(true);
        expect(isNumberValid(Number.NaN, true, true)).toBe(true);

        expect(isNumberValid(NaN, true, false)).toBe(false);
        expect(isNumberValid(Number.NaN, true, false)).toBe(false);
    });

    test('测试5', () => {
        expect(isNumberValid('', false, false)).toBe(false);
        expect(isNumberValid(' ', false, false)).toBe(false);

        expect(isNumberValid('', false, false, true)).toBe(true);
        expect(isNumberValid(' ', false, false, true)).toBe(true);

        expect(isNumberValid('', false, false, false)).toBe(false);
        expect(isNumberValid(' ', false, false, false)).toBe(false);
    });
});
