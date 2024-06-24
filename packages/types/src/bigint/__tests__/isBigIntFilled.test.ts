import { isBigIntFilled } from '..';

describe('@curong/types/isBigIntFilled', () => {
    test('测试1', () => {
        expect(isBigIntFilled(0)).toBe(false);
        expect(isBigIntFilled(1)).toBe(false);
        expect(isBigIntFilled(0n)).toBe(false);
        expect(isBigIntFilled(-1n)).toBe(false);
    });

    test('测试2', () => {
        expect(isBigIntFilled(1n)).toBe(true);
    });
});
