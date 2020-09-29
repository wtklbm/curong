// @ts-nocheck
import { isNotEqual } from '../src';

describe('@curong/types/isNotEqual', () => {
    test('测试1', () => {
        expect(isNotEqual()).toBe(false);
        expect(isNotEqual(null)).toBe(false);
    });

    test('测试2', () => {
        expect(isNotEqual(NaN, NaN, NaN)).toBe(false);
        expect(isNotEqual(NaN, '', NaN)).toBe(false);
        expect(isNotEqual(NaN, {}, NaN, NaN)).toBe(false);
    });

    test('测试3', () => {
        expect(isNotEqual(undefined, undefined, undefined)).toBe(false);
        expect(isNotEqual(null, null, null)).toBe(false);
        expect(isNotEqual('', '', '')).toBe(false);

        const obj = {};
        expect(isNotEqual(obj, obj)).toBe(false);
        expect(isNotEqual({}, {}, {})).toBe(true);

        expect(isNotEqual(1, 1, 1)).toBe(false);
        expect(isNotEqual(/\d+/, /\d+/)).toBe(true);
        expect(isNotEqual('xxx', 'xxx', 'xxx')).toBe(false);
    });
});
