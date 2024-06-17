import { isNumberHave } from '..';

describe('@curong/types/isNumberHave', () => {
    test('测试1', () => {
        expect(isNumberHave(Infinity)).toBe(false);
        expect(isNumberHave(-Infinity)).toBe(false);
        expect(isNumberHave(NaN)).toBe(false);
        expect(isNumberHave(Number.NaN)).toBe(false);
    });

    test('测试2', () => {
        expect(isNumberHave(0)).toBe(false);
        // @ts-ignore
        expect(isNumberHave(0n)).toBe(false);
        // @ts-ignore
        expect(isNumberHave(-1n)).toBe(false);
    });

    test('测试3', () => {
        expect(isNumberHave(-1)).toBe(true);
        expect(isNumberHave(1.0)).toBe(true);
        expect(isNumberHave(1.5e3)).toBe(true);
        expect(isNumberHave(Number.MAX_VALUE)).toBe(true);
        expect(isNumberHave(Number.MIN_VALUE)).toBe(true);
    });
});
