import { isTypeofObjectArray } from '../src';

describe('@curong/types/isTypeofObjectArray', () => {
    test('测试1', () => {
        expect(isTypeofObjectArray([])).toBe(false);
        expect(isTypeofObjectArray(0)).toBe(false);
        expect(isTypeofObjectArray('')).toBe(false);
        expect(isTypeofObjectArray(2)).toBe(false);
        expect(isTypeofObjectArray([2, '1'])).toBe(false);
        expect(isTypeofObjectArray([2, true])).toBe(false);
        expect(isTypeofObjectArray([() => 1])).toBe(false);
    });

    test('测试2', () => {
        expect(isTypeofObjectArray([{}])).toBe(true);
        expect(isTypeofObjectArray([{}, true])).toBe(false);
        expect(isTypeofObjectArray([{}, Object.create(null)])).toBe(true);
    });
});
