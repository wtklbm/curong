import { isTypeofObject } from '../src';

describe('@curong/types/isTypeofObject', () => {
    test('测试1', () => {
        expect(isTypeofObject(new Function())).toBe(false);
    });

    test('测试2', () => {
        expect(isTypeofObject(new TypeError())).toBe(true);
        expect(isTypeofObject({})).toBe(true);
        expect(isTypeofObject([])).toBe(true);
        expect(isTypeofObject(new Boolean(true))).toBe(true);
    });
});
