import { isInRange } from '../src';

describe('isInRange', () => {
    test('测试1', () => {
        expect(isInRange(5, 10)).toBe(true);
        expect(isInRange(10, 10)).toBe(true);
        expect(isInRange(0, 10)).toBe(true);
        expect(isInRange(-1, 10)).toBe(false);
        expect(isInRange(11, 10)).toBe(false);
    });

    test('测试2', () => {
        expect(isInRange(-5, -10)).toBe(true);
        expect(isInRange(-10, -10)).toBe(true);
        expect(isInRange(0, -10)).toBe(true);
        expect(isInRange(1, -10)).toBe(false);
        expect(isInRange(-11, -10)).toBe(false);
    });

    test('测试3', () => {
        expect(isInRange(5, [1, 10])).toBe(true);
        expect(isInRange(1, [1, 10])).toBe(true);
        expect(isInRange(10, [1, 10])).toBe(true);
        expect(isInRange(0, [1, 10])).toBe(false);
        expect(isInRange(11, [1, 10])).toBe(false);
    });

    test('测试4', () => {
        expect(isInRange(-5, [-10, -1])).toBe(true);
        expect(isInRange(-10, [-10, -1])).toBe(true);
        expect(isInRange(-1, [-10, -1])).toBe(true);
        expect(isInRange(0, [-10, -1])).toBe(false);
        expect(isInRange(-11, [-10, -1])).toBe(false);
    });

    test('测试5', () => {
        // @ts-ignore
        expect(() => isInRange(5, [10])).toThrow(TypeError);
        // @ts-ignore
        expect(() => isInRange(5, [10, 20, 30])).toThrow(TypeError);
        // @ts-ignore
        expect(() => isInRange(5, [])).toThrow(TypeError);
    });

    test('测试6', () => {
        expect(() => isInRange(5, '10' as any)).toThrow(TypeError);
        expect(() => isInRange(5, null as any)).toThrow(TypeError);
        expect(() => isInRange(5, undefined as any)).toThrow(TypeError);
    });

    test('测试7', () => {
        expect(() => isInRange(5, NaN)).toThrow(TypeError);
        expect(isInRange(5, Infinity)).toBe(true);
        expect(isInRange(5, -Infinity)).toBe(false);

        expect(() => isInRange(NaN, 10)).toThrow(TypeError);
        expect(isInRange(Infinity, 10)).toBe(false);
        expect(isInRange(-Infinity, 10)).toBe(false);

        expect(() => isInRange(NaN, NaN)).toThrow(TypeError);
        expect(isInRange(Infinity, Infinity)).toBe(true);
        expect(isInRange(-Infinity, -Infinity)).toBe(true);

        expect(() => isInRange(NaN, [0, 10])).toThrow(TypeError);
        expect(isInRange(Infinity, [0, 10])).toBe(false);
        expect(isInRange(-Infinity, [0, 10])).toBe(false);

        expect(() => isInRange(5, [0, NaN])).toThrow(TypeError);
        expect(isInRange(5, [0, Infinity])).toBe(true);
        expect(isInRange(5, [0, -Infinity])).toBe(false);

        expect(() => isInRange(NaN, [0, NaN])).toThrow(TypeError);
        expect(isInRange(Infinity, [0, Infinity])).toBe(true);
        expect(isInRange(-Infinity, [0, -Infinity])).toBe(true);

        expect(() => isInRange(5, [NaN, 10])).toThrow(TypeError);
        expect(isInRange(5, [Infinity, 10])).toBe(false);
        expect(isInRange(5, [-Infinity, 10])).toBe(true);

        expect(() => isInRange(5, [NaN, NaN])).toThrow(TypeError);
        expect(isInRange(5, [Infinity, Infinity])).toBe(false);
        expect(isInRange(5, [-Infinity, -Infinity])).toBe(false);

        expect(() => isInRange(NaN, [NaN, NaN])).toThrow(TypeError);
        expect(isInRange(Infinity, [Infinity, Infinity])).toBe(true);
        expect(isInRange(-Infinity, [-Infinity, -Infinity])).toBe(true);
    });
});
