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
        expect(isNumberValid(1e3)).toBe(true);
        expect(isNumberValid(1.2e3)).toBe(true);
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
        expect(isNumberValid('', { implicit: false })).toBe(false);
        expect(isNumberValid(' ', { implicit: false })).toBe(false);

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

        expect(isNumberValid(true, { implicit: true })).toBe(true);
        expect(isNumberValid(false, { implicit: true })).toBe(true);
        expect(isNumberValid('', { implicit: true })).toBe(true);
        expect(isNumberValid(' ', { implicit: true })).toBe(true);
        expect(isNumberValid([], { implicit: true })).toBe(true);
        expect(isNumberValid(null, { implicit: true })).toBe(true);
        expect(isNumberValid(NaN, { implicit: true })).toBe(false);
        expect(isNumberValid(Number.NaN, { implicit: true })).toBe(false);
        //@ts-ignore
        expect(isNumberValid(1n, { implicit: true })).toBe(true);

        expect(isNumberValid(true, { implicit: false })).toBe(false);
        expect(isNumberValid(false, { implicit: false })).toBe(false);
        expect(isNumberValid('', { implicit: false })).toBe(false);
        expect(isNumberValid(' ', { implicit: false })).toBe(false);
        expect(isNumberValid([], { implicit: false })).toBe(false);
        expect(isNumberValid(null, { implicit: false })).toBe(false);
        expect(isNumberValid(NaN, { implicit: false })).toBe(false);
        expect(isNumberValid(Number.NaN, { implicit: false })).toBe(false);
        //@ts-ignore
        expect(isNumberValid(1n, { implicit: false })).toBe(false);
    });

    test('测试4', () => {
        expect(isNumberValid(NaN, { implicit: true })).toBe(false);
        expect(isNumberValid(Number.NaN, { implicit: true })).toBe(false);

        expect(isNumberValid(NaN, { implicit: true, allowNaN: true })).toBe(
            true
        );
        expect(
            isNumberValid(Number.NaN, { implicit: true, allowNaN: true })
        ).toBe(true);

        expect(isNumberValid(NaN, { implicit: true, allowNaN: false })).toBe(
            false
        );
        expect(
            isNumberValid(Number.NaN, { implicit: true, allowNaN: false })
        ).toBe(false);
    });

    test('测试5', () => {
        expect(
            isNumberValid('', {
                implicit: false,
                allowNaN: false
            })
        ).toBe(false);
        expect(
            isNumberValid(' ', {
                implicit: false,
                allowNaN: false
            })
        ).toBe(false);

        expect(
            isNumberValid('', {
                implicit: false,
                allowNaN: false,
                allowEmptyString: true
            })
        ).toBe(true);
        expect(
            isNumberValid(' ', {
                implicit: false,
                allowNaN: false,
                allowEmptyString: true
            })
        ).toBe(true);

        expect(
            isNumberValid('', {
                implicit: false,
                allowNaN: false,
                allowEmptyString: false
            })
        ).toBe(false);
        expect(
            isNumberValid(' ', {
                implicit: false,
                allowNaN: false,
                allowEmptyString: false
            })
        ).toBe(false);
    });
});
