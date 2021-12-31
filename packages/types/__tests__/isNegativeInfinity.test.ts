import { isNegativeInfinity } from '../src';

describe('@curong/types/isNegativeInfinity', () => {
    test('测试1', () => {
        expect(isNegativeInfinity(-1.7976931348623157e103088)).toBe(true);
        expect(isNegativeInfinity(-1.7976931348623157e103089)).toBe(true);
        expect(isNegativeInfinity(-Infinity)).toBe(true);
    });
});
