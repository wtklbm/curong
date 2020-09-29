import { isIntHave } from '../src';

describe('@curong/types/isIntHave', () => {
    test('测试1', () => {
        expect(isIntHave(12.8)).toBe(false);
        expect(isIntHave(0)).toBe(false);
        expect(isIntHave(NaN)).toBe(false);
    });

    test('测试2', () => {
        expect(isIntHave(1)).toBe(true);
        expect(isIntHave(Number.MAX_SAFE_INTEGER)).toBe(true);
    });
});
