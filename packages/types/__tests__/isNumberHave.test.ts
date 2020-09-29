import { isNumberHave } from '../src';

describe('@curong/types/isNumberHave', () => {
    test('测试1', () => {
        expect(isNumberHave(Infinity)).toBe(false);
        expect(isNumberHave(0)).toBe(false);
    });

    test('测试2', () => {
        expect(isNumberHave(1.0)).toBe(true);
        expect(isNumberHave(1.5e3)).toBe(true);
        expect(isNumberHave(Number.MAX_VALUE)).toBe(true);
    });

    test('测试3', () => {
        expect(isNumberHave(-1)).toBe(false);
    });
});
