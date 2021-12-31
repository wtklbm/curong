import { isBigIntHave } from '../src';

describe('@curong/types/isBigIntHave', () => {
    test('测试1', () => {
        expect(isBigIntHave(0)).toBe(false);
        expect(isBigIntHave(1)).toBe(false);
        expect(isBigIntHave(0n)).toBe(false);
        expect(isBigIntHave(-1n)).toBe(false);
    });

    test('测试2', () => {
        expect(isBigIntHave(1n)).toBe(true);
    });
});
