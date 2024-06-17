import { isTypedArray } from '..';

describe('@curong/types/isTypedArray', () => {
    test('测试1', () => {
        expect(isTypedArray(new ArrayBuffer(1))).toBe(false);
        expect(isTypedArray(Buffer.from('text'))).toBe(false);
        expect(isTypedArray(new DataView(new ArrayBuffer(1)))).toBe(false);
    });

    test('测试2', () => {
        expect(isTypedArray(new Int8Array())).toBe(true);
        expect(isTypedArray(new Uint8Array())).toBe(true);
        expect(isTypedArray(new Uint8ClampedArray())).toBe(true);
        expect(isTypedArray(new Int16Array())).toBe(true);
        expect(isTypedArray(new Uint16Array())).toBe(true);
        expect(isTypedArray(new Int32Array())).toBe(true);
        expect(isTypedArray(new Uint32Array())).toBe(true);
        expect(isTypedArray(new Float32Array())).toBe(true);
        expect(isTypedArray(new Float64Array())).toBe(true);
        expect(isTypedArray(new BigInt64Array())).toBe(true);
        expect(isTypedArray(new BigUint64Array())).toBe(true);
    });
});
