import { isStringTrim } from '../src';

describe('@curong/types/isStringTrim', () => {
    test('测试1', () => {
        expect(isStringTrim(12)).toBe(false);
    });

    test('测试2', () => {
        expect(isStringTrim('xx')).toBe(true);
        expect(isStringTrim('')).toBe(false);
        expect(isStringTrim('  ')).toBe(false);
        expect(isStringTrim('   \t\n  ')).toBe(false);
    });

    test('测试3', () => {
        expect(isStringTrim(null)).toBe(false);
    });
});
