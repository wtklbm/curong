import { isFalse } from '../src';

describe('@curong/types/isFalse', () => {
    test('测试1', () => {
        expect(isFalse(12)).toBe(false);
        expect(isFalse(true)).toBe(false);
        expect(isFalse(false)).toBe(true);
    });
});
