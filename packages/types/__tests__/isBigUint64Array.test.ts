import { isBigUint64Array } from '../src';

describe('@curong/types/isBigUint64Array', () => {
    test('测试1', () => {
        expect(isBigUint64Array(new BigInt64Array(1))).toBe(false);
    });

    test('测试2', () => {
        expect(isBigUint64Array(new BigUint64Array(1))).toBe(true);
    });
});
