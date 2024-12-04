import { isEqual } from '..';

describe('@curong/types/isEqual', () => {
    test('测试1', () => {
        expect(isEqual(null)).toBe(false);
    });

    test('测试2', () => {
        expect(isEqual(NaN, NaN, NaN)).toBe(true);
        expect(isEqual(NaN, '', NaN)).toBe(false);
        expect(isEqual(NaN, {}, NaN, NaN)).toBe(false);
    });

    test('测试3', () => {
        expect(isEqual(undefined, undefined, undefined)).toBe(true);
        expect(isEqual(null, null, null)).toBe(true);
        expect(isEqual('', '', '')).toBe(true);

        const obj = {};
        expect(isEqual(obj, obj)).toBe(true);
        expect(isEqual({}, {}, {})).toBe(false);

        expect(isEqual(1, 1, 1)).toBe(true);
        expect(isEqual(/\d+/, /\d+/)).toBe(false);
        expect(isEqual('xxx', 'xxx', 'xxx')).toBe(true);
    });

    test('测试4', () => {
        expect(isEqual(Symbol('x'), Symbol('x'), Symbol('x'))).toBe(false);
        const s = Symbol.for('xxx');
        expect(isEqual(s, s, s)).toBe(true);
    });
});
