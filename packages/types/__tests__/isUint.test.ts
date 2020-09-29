import { isUint } from '../src';

describe('@curong/types/isUint', () => {
    test('测试1', () => {
        expect(isUint(12.1)).toBe(false);
        expect(isUint(-1)).toBe(false);
    });

    test('测试2', () => {
        expect(isUint(0)).toBe(true);
        expect(isUint(15)).toBe(true);
    });
});
