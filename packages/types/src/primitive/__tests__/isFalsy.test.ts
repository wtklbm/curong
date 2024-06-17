import { isFalsy } from '..';

describe('@curong/types/isFalsy', () => {
    test('测试1', () => {
        expect(isFalsy(false)).toBe(true);
        expect(isFalsy(0)).toBe(true);
        expect(isFalsy(-0)).toBe(true);
        expect(isFalsy(0n)).toBe(true);
        expect(isFalsy('')).toBe(true);
        expect(isFalsy('1')).toBe(false);
        expect(isFalsy(null)).toBe(true);
        expect(isFalsy(undefined)).toBe(true);
        expect(isFalsy(NaN)).toBe(true);
    });
});
