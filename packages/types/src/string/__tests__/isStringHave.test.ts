import { isStringHave } from '..';

describe('@curong/types/isStringHave', () => {
    test('测试1', () => {
        expect(isStringHave(12)).toBe(false);
    });

    test('测试2', () => {
        expect(isStringHave('xx')).toBe(true);
        expect(isStringHave('')).toBe(false);
    });

    test('测试3', () => {
        expect(isStringHave(null)).toBe(false);
    });
});
