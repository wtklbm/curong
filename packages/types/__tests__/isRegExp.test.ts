import { isRegExp } from '../src';

describe('@curong/types/isRegExp', () => {
    test('测试1', () => {
        expect(isRegExp(/\d/)).toBe(true);
    });

    test('测试2', () => {
        expect(isRegExp({})).toBe(false);
    });

    test('测试3', () => {
        expect(isRegExp(null)).toBe(false);
    });
});
