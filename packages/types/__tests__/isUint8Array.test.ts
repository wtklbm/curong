import { isUint8Array } from '../src';

describe('@curong/types/isUint8Array', () => {
    test('测试1', () => {
        expect(isUint8Array(new Uint16Array())).toBe(false);
    });

    test('测试2', () => {
        expect(isUint8Array(new Uint8Array())).toBe(true);
    });
});
