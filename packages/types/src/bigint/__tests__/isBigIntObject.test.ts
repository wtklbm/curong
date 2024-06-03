import { isBigIntObject } from '..';

describe('@curong/types/isBigIntObject', () => {
    test('测试1', () => {
        expect(isBigIntObject(0)).toBe(false);
        expect(isBigIntObject(1)).toBe(false);
        expect(isBigIntObject(0n)).toBe(false);
        expect(isBigIntObject(-1n)).toBe(false);
    });

    test('测试2', () => {
        expect(isBigIntObject(Object(1n))).toBe(true);
    });
});
