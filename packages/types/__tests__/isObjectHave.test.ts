import { isObjectHave } from '../src';

describe('@curong/types/isObjectHave', () => {
    test('测试1', () => {
        expect(isObjectHave(12)).toBe(false);
    });

    test('测试2', () => {
        expect(isObjectHave({})).toBe(false);
        expect(isObjectHave({ a: 1 })).toBe(true);
    });

    test('测试3', () => {
        expect(isObjectHave(null)).toBe(false);
    });
});
