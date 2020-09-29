// @ts-nocheck
import { toRegExpSource } from '../src';

describe('@curong/string/toRegExpSource', () => {
    test('测试1', () => {
        expect(toRegExpSource).toThrowError();
    });

    test('测试2', () => {
        expect(toRegExpSource('xxx')).toBe('xxx');
        expect(toRegExpSource('+')).toBe('\\+');
    });
});
