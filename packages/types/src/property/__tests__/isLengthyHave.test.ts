import { isLengthyHave } from '..';

describe('@curong/types/isLengthyHave', () => {
    test('测试1', () => {
        expect(isLengthyHave(new Map())).toBe(false);
        expect(isLengthyHave(new Set())).toBe(false);
        expect(isLengthyHave({})).toBe(false);
        expect(isLengthyHave([])).toBe(false);
        expect(isLengthyHave('')).toBe(false);
        expect(isLengthyHave(new Function())).toBe(false);
    });

    test('测试2', () => {
        expect(isLengthyHave([1])).toBe(true);
        expect(isLengthyHave('1')).toBe(true);
        expect(isLengthyHave(new Function('x', 'xxx'))).toBe(true);
    });
});
