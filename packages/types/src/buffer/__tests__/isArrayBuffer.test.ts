import { isArrayBuffer } from '..';

describe('@curong/types/isArrayBuffer', () => {
    test('测试1', () => {
        expect(isArrayBuffer(Buffer.from('text'))).toBe(false);
        expect(isArrayBuffer(new ArrayBuffer(1))).toBe(true);
    });
});
