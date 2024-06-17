import { isVarName } from '..';

describe('@curong/types/isVarName', () => {
    test('测试1', () => {
        expect(isVarName(12)).toBe(false);
    });

    test('测试2', () => {
        expect(isVarName('xxx')).toBe(true);
    });

    test('测试3', () => {
        expect(isVarName(null)).toBe(false);
        expect(isVarName(' xxx f ')).toBe(false);
        expect(isVarName('-@#')).toBe(false);
    });
});
