import { isIntSafe } from '..';

describe('@curong/types/isIntSafe', () => {
    test('测试1', () => {
        expect(isIntSafe('3')).toBe(false);
        expect(isIntSafe(NaN)).toBe(false);
        expect(isIntSafe(Infinity)).toBe(false);
        expect(isIntSafe(-Infinity)).toBe(false);
        expect(isIntSafe(Math.pow(2, 53))).toBe(false);
        expect(isIntSafe(12.8)).toBe(false);
        expect(isIntSafe(3.14159)).toBe(false);
        expect(isIntSafe(-3.14159)).toBe(false);
        expect(isIntSafe([1])).toBe(false);
        expect(isIntSafe(Number.MIN_SAFE_INTEGER - 2)).toBe(false);
        expect(isIntSafe(Number.MAX_SAFE_INTEGER + 2)).toBe(false);
    });

    test('测试2', () => {
        expect(isIntSafe(0)).toBe(true);
        expect(isIntSafe(22123412412434)).toBe(true);
        expect(isIntSafe(Math.pow(2, 53) - 1)).toBe(true);

        expect(isIntSafe(Number.MIN_SAFE_INTEGER)).toBe(true);
        expect(isIntSafe(Number.MIN_SAFE_INTEGER - 2)).toBe(false);
        expect(isIntSafe(Number.MAX_SAFE_INTEGER)).toBe(true);
        expect(isIntSafe(Number.MAX_SAFE_INTEGER + 2)).toBe(false);
    });
});
