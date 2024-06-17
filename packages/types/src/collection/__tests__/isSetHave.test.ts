import { isSetHave } from '..';

describe('@curong/types/isSetHave', () => {
    test('测试1', () => {
        expect(isSetHave(new Set())).toBe(false);
    });

    test('测试2', () => {
        expect(isSetHave(new Set([1]))).toBe(true);
    });
});
