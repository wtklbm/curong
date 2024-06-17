import { isBigInt64Array } from '..';

describe('@curong/types/isBigInt64Array', () => {
    test('测试1', () => {
        expect(isBigInt64Array(new BigUint64Array(1))).toBe(false);
    });

    test('测试2', () => {
        expect(isBigInt64Array(new BigInt64Array(1))).toBe(true);
    });
});
