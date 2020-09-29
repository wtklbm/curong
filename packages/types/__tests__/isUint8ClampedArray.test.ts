import { isUint8ClampedArray } from '../src';

describe('@curong/types/isUint8ClampedArray', () => {
    test('测试1', () => {
        expect(isUint8ClampedArray(new Uint16Array())).toBe(false);
    });

    test('测试2', () => {
        expect(isUint8ClampedArray(new Uint8ClampedArray())).toBe(true);
    });
});
