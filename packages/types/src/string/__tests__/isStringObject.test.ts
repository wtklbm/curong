import { isStringObject } from '..';

describe('@curong/types/isStringObject', () => {
    test('测试1', () => {
        expect(isStringObject('')).toBe(false);
    });

    test('测试2', () => {
        expect(isStringObject(new String())).toBe(true);
        expect(isStringObject(Object(''))).toBe(true);
        expect(isStringObject(new Object(''))).toBe(true);
    });
});
