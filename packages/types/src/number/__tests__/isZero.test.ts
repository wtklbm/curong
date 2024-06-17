import { isZero } from '..';

describe('@curong/types/isZero', () => {
    test('测试1', () => {
        expect(isZero('')).toBe(false);
        expect(isZero(0)).toBe(true);
    });
});
