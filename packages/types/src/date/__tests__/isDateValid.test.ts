import { isDateValid } from '..';

describe('@curong/types/isDateValid', () => {
    test('测试1', () => {
        expect(isDateValid(undefined)).toBe(false);
        expect(isDateValid({})).toBe(false); // 对象
        expect(isDateValid([])).toBe(false); // 数组

        expect(isDateValid('not a date')).toBe(false);
        expect(isDateValid('1234567890')).toBe(false);
        expect(isDateValid('1617235200000')).toBe(false);

        expect(isDateValid('')).toBe(false); // 空字符串
        expect(isDateValid('invalid-date')).toBe(false); // 无效日期格式
        expect(isDateValid('2021-02-30')).toBe(true); // 不存在的日期
        expect(isDateValid('2021-13-01')).toBe(false); // 不存在的月份

        expect(isDateValid(new Date('invalid-date'))).toBe(false); // 无效日期对象
    });

    test('测试2', () => {
        expect(isDateValid(null)).toBe(true);
        expect(isDateValid(true)).toBe(true); // 布尔值
        expect(isDateValid(12)).toBe(true); // 数字
        expect(isDateValid([12])).toBe(true);
        expect(isDateValid(new Date())).toBe(true);
        expect(isDateValid('2023-04-01')).toBe(true);
        expect(isDateValid(1234567890)).toBe(true);
        expect(isDateValid(1617235200000)).toBe(true);
        expect(isDateValid(new Date(1617235200000))).toBe(true);
        expect(isDateValid('01 Jan 1970 00:00:00 GMT')).toBe(true);
        expect(isDateValid(['2020-06-19', '17:13'])).toBe(true);
        expect(isDateValid('2021-05-30')).toBe(true); // ISO 8601 日期
        expect(isDateValid('May 30, 2021')).toBe(true); // 长日期格式
        expect(isDateValid('05/30/2021')).toBe(true); // 美式日期格式
        expect(isDateValid('2021-05-30T00:00:00Z')).toBe(true); // 带时间的 ISO 8601 日期
        expect(isDateValid(new Date())).toBe(true); // 当前日期
        expect(isDateValid(new Date('2021-05-30'))).toBe(true); // 通过字符串创建的日期对象
        expect(isDateValid(new Date(1622318400000))).toBe(true); // 通过时间戳创建的日期对象
    });
});
