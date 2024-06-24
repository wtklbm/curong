import { isLengthyFilled } from '..';

describe('@curong/types/isLengthyFilled', () => {
    test('测试1', () => {
        expect(isLengthyFilled(new Map())).toBe(false);
        expect(isLengthyFilled(new Set())).toBe(false);
        expect(isLengthyFilled({})).toBe(false);
        expect(isLengthyFilled([])).toBe(false);
        expect(isLengthyFilled('')).toBe(false);
        expect(isLengthyFilled(new Function())).toBe(false);
    });

    test('测试2', () => {
        expect(isLengthyFilled([1])).toBe(true);
        expect(isLengthyFilled('1')).toBe(true);
        expect(isLengthyFilled(new Function('x', 'xxx'))).toBe(true);
    });
});
