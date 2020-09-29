import { isStringPrimitive } from '../src';

describe('@curong/types/isStringPrimitive', () => {
    test('测试1', () => {
        expect(isStringPrimitive(new String())).toBe(false);
    });

    test('测试2', () => {
        expect(isStringPrimitive('')).toBe(true);
    });
});
