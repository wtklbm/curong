import { isUint8Array } from '..';

describe('@curong/types/isUint8Array', () => {
    test('测试1', () => {
        expect(isUint8Array(new Uint16Array())).toBe(false);
        expect(isUint8Array(Buffer.from('xxx'))).toBe(false);
    });

    test('测试2', () => {
        expect(isUint8Array(new Uint8Array())).toBe(true);
    });
});
