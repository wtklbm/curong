import { isStringFilled } from '..';

describe('@curong/types/isStringFilled', () => {
    test('测试1', () => {
        expect(isStringFilled(12)).toBe(false);
    });

    test('测试2', () => {
        expect(isStringFilled('xx')).toBe(true);
        expect(isStringFilled('')).toBe(false);
    });

    test('测试3', () => {
        expect(isStringFilled(null)).toBe(false);
    });
});
