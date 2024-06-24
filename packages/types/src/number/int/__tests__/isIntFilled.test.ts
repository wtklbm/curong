import { isIntFilled } from '..';

describe('@curong/types/isIntFilled', () => {
    test('测试1', () => {
        expect(isIntFilled(12.8)).toBe(false);
        expect(isIntFilled(0)).toBe(false);
        expect(isIntFilled(NaN)).toBe(false);
    });

    test('测试2', () => {
        expect(isIntFilled(1)).toBe(true);
        expect(isIntFilled(Number.MAX_SAFE_INTEGER)).toBe(true);
    });
});
