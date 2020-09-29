import { isNotZero } from '../src';

describe('@curong/types/isNotZero', () => {
    test('测试1', () => {
        expect(isNotZero('')).toBe(true);
        expect(isNotZero(0)).toBe(false);
    });
});
