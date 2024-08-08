import { isLeapYear } from '..';

describe('@curong/types/isLeapYear', () => {
    test('2020年是闰年', () => {
        expect(isLeapYear(2020)).toBe(true);
    });

    test('1900年不是闰年', () => {
        expect(isLeapYear(1900)).toBe(false);
    });

    test('2000年是闰年', () => {
        expect(isLeapYear(2000)).toBe(true);
    });

    test('2021年不是闰年', () => {
        expect(isLeapYear(2021)).toBe(false);
    });

    test('闰年边界测试：1996年是闰年', () => {
        expect(isLeapYear(1996)).toBe(true);
    });

    test('闰年边界测试：2100年不是闰年', () => {
        expect(isLeapYear(2100)).toBe(false);
    });

    test('输入负数抛出错误', () => {
        expect(isLeapYear(-1)).toBe(false);
    });

    test('输入零抛出错误', () => {
        expect(isLeapYear(0)).toBe(false);
    });

    test('输入非整数抛出错误', () => {
        expect(isLeapYear(2020.5)).toBe(false);
    });

    test('输入字符串抛出错误', () => {
        expect(isLeapYear('2020')).toBe(false);
    });
});
