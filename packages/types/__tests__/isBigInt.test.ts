import { isBigInt } from '../src';

describe('@curong/types/isBigInt', () => {
    test('测试1', () => {
        expect(isBigInt(1)).toBe(false);
    });

    test('测试2', () => {
        // @ts-ignore
        expect(isBigInt(1n)).toBe(true);
    });
});
