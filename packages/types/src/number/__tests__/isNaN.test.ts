// @ts-nocheck

import { isNaN } from '..';

describe('@curong/types/isNaN', () => {
    test('测试1', () => {
        expect(isNaN(12)).toBe(false);
        // @ts-ignore
        expect(isNaN(1n)).toBe(false);
        expect(isNaN(12)).toBe(false);
        expect(isNaN([1])).toBe(false);
    });

    test('测试2', () => {
        expect(isNaN(NaN)).toBe(true);
        expect(isNaN(NaN + 1)).toBe(true);
        expect(isNaN(NaN + null)).toBe(true);
        expect(isNaN(NaN + undefined)).toBe(true);
        expect(isNaN(''.charCodeAt(1))).toBe(true);
        expect(isNaN(new Date('xxx').getTime())).toBe(true);
        expect(isNaN(7 * 'xxx')).toBe(true);
        expect(isNaN(7 ** NaN)).toBe(true);
        expect(isNaN(Infinity - Infinity)).toBe(true);
        expect(isNaN(Infinity / Infinity)).toBe(true);
        expect(isNaN(1 ** Infinity)).toBe(true);
        expect(isNaN(0 * Infinity)).toBe(true);
        expect(isNaN(Math.sqrt(-1))).toBe(true);
        expect(isNaN(Math.abs(undefined))).toBe(true);
        expect(isNaN(Number(undefined))).toBe(true);
        expect(isNaN(parseInt('xxx'))).toBe(true);
        expect(isNaN([])).toBe(false);
        expect(isNaN([1])).toBe(false);
        expect(isNaN([1, 2])).toBe(false);
        expect(isNaN('中')).toBe(false);
        expect(isNaN('1')).toBe(false);
    });

    test('测试3', () => {
        expect(isNaN(NaN, true)).toBe(true);
        expect(isNaN(NaN + 1, true)).toBe(true);
        expect(isNaN(NaN + null, true)).toBe(true);
        expect(isNaN(NaN + undefined, true)).toBe(true);
        expect(isNaN(''.charCodeAt(1), true)).toBe(true);
        expect(isNaN(new Date('xxx').getTime(), true)).toBe(true);
        expect(isNaN(7 * 'xxx', true)).toBe(true);
        expect(isNaN(7 ** NaN, true)).toBe(true);
        expect(isNaN(Infinity - Infinity, true)).toBe(true);
        expect(isNaN(Infinity / Infinity, true)).toBe(true);
        expect(isNaN(1 ** Infinity, true)).toBe(true);
        expect(isNaN(0 * Infinity, true)).toBe(true);
        expect(isNaN(Math.sqrt(-1), true)).toBe(true);
        expect(isNaN(Math.abs(undefined), true)).toBe(true);
        expect(isNaN(Number(undefined), true)).toBe(true);
        expect(isNaN(parseInt('xxx'), true)).toBe(true);
        expect(isNaN([], true)).toBe(false);
        expect(isNaN([1], true)).toBe(false);
        expect(isNaN([1, 2], true)).toBe(true);
        expect(isNaN('中', true)).toBe(true);
        expect(isNaN('1', true)).toBe(false);
    });

    test('测试4', () => {
        expect(isNaN(NaN, false)).toBe(true);
        expect(isNaN(NaN + 1, false)).toBe(true);
        expect(isNaN(NaN + null, false)).toBe(true);
        expect(isNaN(NaN + undefined, false)).toBe(true);
        expect(isNaN(''.charCodeAt(1), false)).toBe(true);
        expect(isNaN(new Date('xxx').getTime(), false)).toBe(true);
        expect(isNaN(7 * 'xxx', false)).toBe(true);
        expect(isNaN(7 ** NaN, false)).toBe(true);
        expect(isNaN(Infinity - Infinity, false)).toBe(true);
        expect(isNaN(Infinity / Infinity, false)).toBe(true);
        expect(isNaN(1 ** Infinity, false)).toBe(true);
        expect(isNaN(0 * Infinity, false)).toBe(true);
        expect(isNaN(Math.sqrt(-1), false)).toBe(true);
        expect(isNaN(Math.abs(undefined), false)).toBe(true);
        expect(isNaN(Number(undefined), false)).toBe(true);
        expect(isNaN([], false)).toBe(false);
        expect(isNaN([1], false)).toBe(false);
        expect(isNaN(parseInt('xxx'), false)).toBe(true);
        expect(isNaN([1, 2], true)).toBe(true);
        expect(isNaN('中', true)).toBe(true);
        expect(isNaN('1', false)).toBe(false);
    });
});
