import { isBigIntPrimitive } from '../src';

describe('@curong/types/isBigIntPrimitive', () => {
    test('测试1', () => {
        expect(isBigIntPrimitive(0)).toBe(false);
        expect(isBigIntPrimitive(1)).toBe(false);
    });

    test('测试2', () => {
        expect(isBigIntPrimitive(-1n)).toBe(true);
        expect(isBigIntPrimitive(0n)).toBe(true);
        expect(isBigIntPrimitive(Object(1n))).toBe(false);
    });
});
