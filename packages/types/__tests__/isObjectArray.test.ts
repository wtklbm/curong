import { isObjectArray } from '../src';

describe('@curong/types/isObjectArray', () => {
    test('测试1', () => {
        expect(isObjectArray([])).toBe(false);
        expect(isObjectArray(0)).toBe(false);
        expect(isObjectArray('')).toBe(false);
        expect(isObjectArray(2)).toBe(false);
        expect(isObjectArray([2, '1'])).toBe(false);
        expect(isObjectArray([2, true])).toBe(false);
        expect(isObjectArray([() => 1])).toBe(false);
    });

    test('测试2', () => {
        expect(isObjectArray([{}])).toBe(true);
        expect(isObjectArray([{}, true])).toBe(false);
        expect(isObjectArray([{}, Object(1)])).toBe(true);
    });
});
