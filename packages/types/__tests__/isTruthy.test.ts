import { isTruthy } from '../src';

describe('@curong/types/isTruthy', () => {
    test('测试1', () => {
        expect(isTruthy(false)).toBe(false);
        expect(isTruthy(0)).toBe(false);
        expect(isTruthy(-0)).toBe(false);
        expect(isTruthy(0n)).toBe(false);
        expect(isTruthy('')).toBe(false);
        expect(isTruthy('1')).toBe(true);
        expect(isTruthy(null)).toBe(false);
        expect(isTruthy(undefined)).toBe(false);
        expect(isTruthy(NaN)).toBe(false);
    });
});
