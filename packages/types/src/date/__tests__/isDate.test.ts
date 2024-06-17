import { isDate } from '..';

describe('@curong/types/isDate', () => {
    test('测试1', () => {
        expect(isDate(12)).toBe(false);
    });

    test('测试2', () => {
        expect(isDate(new Date())).toBe(true);
    });

    test('测试3', () => {
        expect(isDate([1])).toBe(false);
    });
});
