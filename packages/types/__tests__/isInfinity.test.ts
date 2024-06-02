import { isInfinity } from '../src';

describe('@curong/types/isInfinity', () => {
    test('测试1', () => {
        expect(isInfinity(1.7976931348623157e103088)).toBe(true);
        expect(isInfinity(-1.7976931348623157e103089)).toBe(true);
        expect(isInfinity(Infinity)).toBe(true);
        expect(isInfinity(-Infinity)).toBe(true);
        expect(isInfinity(5 / 0)).toBe(true);
        expect(isInfinity(-5 / 0)).toBe(true);
    });
});
