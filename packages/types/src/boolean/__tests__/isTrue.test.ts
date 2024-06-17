import { isTrue } from '..';

describe('@curong/types/isTrue', () => {
    test('测试1', () => {
        expect(isTrue(12)).toBe(false);
        expect(isTrue(true)).toBe(true);
        expect(isTrue(false)).toBe(false);
    });
});
