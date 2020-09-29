import { isStringObject } from '../src';

describe('@curong/types/isStringObject', () => {
    test('测试1', () => {
        expect(isStringObject('')).toBe(false);
    });

    test('测试2', () => {
        expect(isStringObject(new String())).toBe(true);
    });
});
