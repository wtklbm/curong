import { isUintHave } from '..';

describe('@curong/types/isUintHave', () => {
    test('测试1', () => {
        expect(isUintHave(12.1)).toBe(false);
        expect(isUintHave(-1)).toBe(false);
    });

    test('测试2', () => {
        expect(isUintHave(0)).toBe(false);
        expect(isUintHave(15)).toBe(true);
    });
});
