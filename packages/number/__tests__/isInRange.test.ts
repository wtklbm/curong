import { isInRange } from '../src';

describe('isInRange', () => {
    test('value is within the range when range is a single positive number', () => {
        expect(isInRange(5, 10)).toBe(true);
        expect(isInRange(10, 10)).toBe(true);
        expect(isInRange(0, 10)).toBe(true);
        expect(isInRange(-1, 10)).toBe(false);
        expect(isInRange(11, 10)).toBe(false);
    });

    test('value is within the range when range is a single negative number', () => {
        expect(isInRange(-5, -10)).toBe(true);
        expect(isInRange(-10, -10)).toBe(true);
        expect(isInRange(0, -10)).toBe(true);
        expect(isInRange(1, -10)).toBe(false);
        expect(isInRange(-11, -10)).toBe(false);
    });

    test('value is within the range when range is an array of two numbers', () => {
        expect(isInRange(5, [1, 10])).toBe(true);
        expect(isInRange(1, [1, 10])).toBe(true);
        expect(isInRange(10, [1, 10])).toBe(true);
        expect(isInRange(0, [1, 10])).toBe(false);
        expect(isInRange(11, [1, 10])).toBe(false);
    });

    test('value is within the range when range is an array with negative numbers', () => {
        expect(isInRange(-5, [-10, -1])).toBe(true);
        expect(isInRange(-10, [-10, -1])).toBe(true);
        expect(isInRange(-1, [-10, -1])).toBe(true);
        expect(isInRange(0, [-10, -1])).toBe(false);
        expect(isInRange(-11, [-10, -1])).toBe(false);
    });

    test('range is an invalid array', () => {
        // @ts-ignore
        expect(() => isInRange(5, [10])).toThrow(TypeError);
        // @ts-ignore
        expect(() => isInRange(5, [10, 20, 30])).toThrow(TypeError);
        // @ts-ignore
        expect(() => isInRange(5, [])).toThrow(TypeError);
    });

    test('range is an invalid type', () => {
        expect(() => isInRange(5, '10' as any)).toThrow(TypeError);
        expect(() => isInRange(5, null as any)).toThrow(TypeError);
        expect(() => isInRange(5, undefined as any)).toThrow(TypeError);
    });
});
