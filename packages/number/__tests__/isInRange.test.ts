import { inRange } from '../src';

describe('inRange', () => {
    test('测试1', () => {
        expect(inRange(5, 10)).toBe(true);
        expect(inRange(10, 10)).toBe(true);
        expect(inRange(0, 10)).toBe(true);
        expect(inRange(-1, 10)).toBe(false);
        expect(inRange(11, 10)).toBe(false);
    });

    test('测试2', () => {
        expect(inRange(-5, -10)).toBe(true);
        expect(inRange(-10, -10)).toBe(true);
        expect(inRange(0, -10)).toBe(true);
        expect(inRange(1, -10)).toBe(false);
        expect(inRange(-11, -10)).toBe(false);
    });

    test('测试3', () => {
        expect(inRange(5, 1, 10)).toBe(true);
        expect(inRange(1, 1, 10)).toBe(true);
        expect(inRange(10, 1, 10)).toBe(true);
        expect(inRange(0, 1, 10)).toBe(false);
        expect(inRange(11, 1, 10)).toBe(false);
    });

    test('测试4', () => {
        expect(inRange(-5, -10, -1)).toBe(true);
        expect(inRange(-10, -10, -1)).toBe(true);
        expect(inRange(-1, -10, -1)).toBe(true);
        expect(inRange(0, -10, -1)).toBe(false);
        expect(inRange(-11, -10, -1)).toBe(false);
    });

    test('测试5', () => {
        expect(() => inRange(5, '10' as any)).toThrow(TypeError);
        expect(() => inRange(5, null as any)).toThrow(TypeError);
        expect(() => inRange(5, undefined as any)).toThrow(TypeError);
    });

    test('测试6', () => {
        expect(() => inRange(5, NaN)).toThrow(TypeError);
        expect(inRange(5, Infinity)).toBe(true);
        expect(inRange(5, -Infinity)).toBe(false);

        expect(() => inRange(NaN, 10)).toThrow(TypeError);
        expect(inRange(Infinity, 10)).toBe(false);
        expect(inRange(-Infinity, 10)).toBe(false);

        expect(() => inRange(NaN, NaN)).toThrow(TypeError);
        expect(inRange(Infinity, Infinity)).toBe(true);
        expect(inRange(-Infinity, -Infinity)).toBe(true);

        expect(() => inRange(NaN, 0, 10)).toThrow(TypeError);
        expect(inRange(Infinity, 0, 10)).toBe(false);
        expect(inRange(-Infinity, 0, 10)).toBe(false);

        expect(() => inRange(5, 0, NaN)).toThrow(TypeError);
        expect(inRange(5, 0, Infinity)).toBe(true);
        expect(inRange(5, 0, -Infinity)).toBe(false);

        expect(() => inRange(NaN, 0, NaN)).toThrow(TypeError);
        expect(inRange(Infinity, 0, Infinity)).toBe(true);
        expect(inRange(-Infinity, 0, -Infinity)).toBe(true);

        expect(() => inRange(5, NaN, 10)).toThrow(TypeError);
        expect(inRange(5, Infinity, 10)).toBe(false);
        expect(inRange(5, -Infinity, 10)).toBe(true);

        expect(() => inRange(5, NaN, NaN)).toThrow(TypeError);
        expect(inRange(5, Infinity, Infinity)).toBe(false);
        expect(inRange(5, -Infinity, -Infinity)).toBe(false);

        expect(() => inRange(NaN, NaN, NaN)).toThrow(TypeError);
        expect(inRange(Infinity, Infinity, Infinity)).toBe(true);
        expect(inRange(-Infinity, -Infinity, -Infinity)).toBe(true);
    });
});
