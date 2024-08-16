import { stringify } from '../src';

describe('@curong/number/stringify', () => {
    test('测试1', () => {
        expect(stringify(0)).toBe('0');
        expect(stringify(-0)).toBe('-0');
        expect(stringify(42)).toBe('42');
        expect(stringify(-42)).toBe('-42');
        expect(stringify(3.14)).toBe('3.14');
        expect(stringify(-3.14)).toBe('-3.14');
    });

    test('测试2', () => {
        expect(stringify(Number.EPSILON)).toBe('2.220446049250313e-16')
        expect(stringify(-Number.EPSILON)).toBe('-2.220446049250313e-16')

        expect(stringify(Number.MAX_SAFE_INTEGER)).toBe('9007199254740991')
        expect(stringify(-Number.MAX_SAFE_INTEGER)).toBe('-9007199254740991')

        expect(stringify(Number.MAX_VALUE)).toBe('1.7976931348623157e+308')
        expect(stringify(-Number.MAX_VALUE)).toBe('-1.7976931348623157e+308')

        expect(stringify(Number.MIN_SAFE_INTEGER)).toBe('-9007199254740991')
        expect(stringify(-Number.MIN_SAFE_INTEGER)).toBe('9007199254740991')

        expect(stringify(Number.MIN_VALUE)).toBe('5e-324')
        expect(stringify(-Number.MIN_VALUE)).toBe('-5e-324')

        expect(stringify(Number.POSITIVE_INFINITY)).toBe('Infinity');
        expect(stringify(Number.NEGATIVE_INFINITY)).toBe('-Infinity');
        expect(stringify(NaN)).toBe('NaN');
    });
});
