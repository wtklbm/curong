/**
 * @jest-environment jsdom
 */

import { copyAttrs } from '../src';

describe('@curong/util/copyAttrs', () => {
    test('测试1', () => {
        expect(copyAttrs(undefined, undefined)).toBe(undefined);
        expect(copyAttrs(null, undefined)).toBe(undefined);
    });

    test('测试2', () => {
        const obj = copyAttrs({ a: 1, s: 'str' }, { x: 'x' }, true);
        expect(obj).toEqual({ x: 'x', a: 1, s: 'str' });
    });

    test('测试4', () => {
        const obj = copyAttrs({ a: 1, s: 'str' }, { x: 'x' }, false);
        expect(obj).toEqual({ x: 'x', a: 1, s: 'str' });
    });

    test('测试5', () => {
        expect(
            copyAttrs({ a: 1, s: 'str' }, { a: 2, s: 'xxx', x: 'x' }, false)
        ).toEqual({ x: 'x', a: 1, s: 'str' });

        expect(
            copyAttrs({ a: 1, s: 'str' }, { a: 2, s: 'xxx', x: 'x' }, true)
        ).toEqual({ x: 'x', a: 2, s: 'xxx' });
    });
});
