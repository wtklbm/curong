import { isFloat32Array } from '..';

describe('@curong/types/isFloat32Array', () => {
    test('测试1', () => {
        expect(isFloat32Array(new Float64Array())).toBe(false);
    });

    test('测试2', () => {
        expect(isFloat32Array(new Float32Array())).toBe(true);
    });
});
