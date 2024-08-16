import { isRegExp } from '..';

describe('@curong/types/isRegExp', () => {
    test('测试1', () => {
        expect(isRegExp(/\d/)).toBe(true);
        expect(isRegExp(new RegExp('\\d'))).toBe(true);
    });

    test('测试2', () => {
        expect(isRegExp({})).toBe(false);
    });

    test('测试3', () => {
        expect(isRegExp(null)).toBe(false);
    });
});
