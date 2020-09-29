import { isArrayBufferView } from '../src';

describe('@curong/types/isArrayBufferView', () => {
    test('测试1', () => {
        expect(isArrayBufferView(new ArrayBuffer(1))).toBe(false);
        expect(isArrayBufferView(Buffer.from('text'))).toBe(false);
    });

    test('测试2', () => {
        expect(isArrayBufferView(new Int8Array())).toBe(true);
        expect(isArrayBufferView(new Uint8Array())).toBe(true);
        expect(isArrayBufferView(new Uint8ClampedArray())).toBe(true);
        expect(isArrayBufferView(new Int16Array())).toBe(true);
        expect(isArrayBufferView(new Uint16Array())).toBe(true);
        expect(isArrayBufferView(new Int32Array())).toBe(true);
        expect(isArrayBufferView(new Uint32Array())).toBe(true);
        expect(isArrayBufferView(new Float32Array())).toBe(true);
        expect(isArrayBufferView(new Float64Array())).toBe(true);
        expect(isArrayBufferView(new DataView(new ArrayBuffer(1)))).toBe(true);
    });
});
