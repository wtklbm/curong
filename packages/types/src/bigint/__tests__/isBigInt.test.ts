import { isBigInt } from '..';

describe('@curong/types/isBigInt', () => {
    test('测试1', () => {
        expect(isBigInt(1)).toBe(false);
    });

    test('测试2', () => {
        // @ts-ignore
        expect(isBigInt(1n)).toBe(true);
        expect(isBigInt(BigInt(1n))).toBe(true);
        expect(isBigInt(Object(1n))).toBe(true);
        expect(isBigInt(new Object(1n))).toBe(true);
    });
});
