import { isUintFilled } from '..';

describe('@curong/types/isUintFilled', () => {
    test('测试1', () => {
        expect(isUintFilled(12.1)).toBe(false);
        expect(isUintFilled(-1)).toBe(false);
    });

    test('测试2', () => {
        expect(isUintFilled(0)).toBe(false);
        expect(isUintFilled(15)).toBe(true);
    });
});
