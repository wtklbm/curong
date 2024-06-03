import { isBuffer } from '..';

describe('@curong/types/isBuffer', () => {
    test('测试1', () => {
        expect(isBuffer(12)).toBe(false);
        expect(isBuffer(new Uint8Array())).toBe(false);
        expect(isBuffer(new Int8Array())).toBe(false);
        expect(isBuffer(new Int16Array())).toBe(false);
        expect(isBuffer(new Uint16Array())).toBe(false);
    });

    test('测试2', () => {
        expect(isBuffer(Buffer.from('x'))).toBe(true);
    });

    test('测试3', () => {
        expect(isBuffer([1])).toBe(false);
    });
});
