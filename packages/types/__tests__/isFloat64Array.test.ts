import { isFloat64Array } from '../src';

describe('@curong/types/isFloat64Array', () => {
    test('测试1', () => {
        expect(isFloat64Array(new Float32Array(1))).toBe(false);
    });

    test('测试2', () => {
        expect(isFloat64Array(new Float64Array())).toBe(true);
    });
});
