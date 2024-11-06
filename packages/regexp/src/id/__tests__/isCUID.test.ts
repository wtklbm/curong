import { isCUID } from '..';

describe('@curong/regexp/isCUID', () => {
    test('测试1', () => {
        expect(isCUID('')).toBe(false);
        expect(isCUID('this-is-not-a-cuid')).toBe(false);
        expect(isCUID('c0g1z8g0g00000000000000000Z')).toBe(false);
    });

    test('测试2', () => {
        expect(isCUID('c0g1z8g0g00000000000000000')).toBe(true);
        expect(isCUID('cjld2cjxh0000qzrmn831i7rn')).toBe(true);
        expect(isCUID('cjld2cyuq0000t3rmniod1foy')).toBe(true);
    });
});
