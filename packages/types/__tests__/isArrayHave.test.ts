import { isArrayHave } from '../src';

describe('@curong/types/isArrayHave', () => {
    test('测试1', () => {
        expect(isArrayHave(12)).toBe(false);
    });

    test('测试2', () => {
        expect(isArrayHave([])).toBe(false);
    });

    test('测试3', () => {
        expect(isArrayHave([1])).toBe(true);
    });
});
