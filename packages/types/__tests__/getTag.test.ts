import { getTag } from '../src';

describe('@curong/types/getTag', () => {
    test('测试1', () => {
        expect(getTag(12)).toBe('Number');
    });

    test('测试2', () => {
        expect(getTag({})).toBe('Object');
    });

    test('测试3', () => {
        expect(getTag(null)).toBe('Null');
        expect(getTag(null, false)).toBe('[object Null]');
    });

    test('测试4', () => {
        // @ts-ignore
        Object.prototype.toString = null;
        expect(getTag({})).toBe(null);
    });
});
