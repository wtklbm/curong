import { isBuffer } from '..';

describe('@curong/types/isBuffer', () => {
    test('测试1', () => {
        expect(isBuffer(12)).toBe(false);
        expect(isBuffer(null)).toBe(false);
        expect(isBuffer(undefined)).toBe(false);
        expect(isBuffer(0)).toBe(false);
        expect(isBuffer(1)).toBe(false);
        expect(isBuffer('')).toBe(false);
        expect(isBuffer([])).toBe(false);
        expect(isBuffer({})).toBe(false);
        expect(isBuffer({ isBuffer: null })).toBe(false);
        expect(
            isBuffer({
                isBuffer: function () {
                    throw new Error();
                }
            })
        ).toBe(false);
        expect(isBuffer(() => {})).toBe(false);
        expect(isBuffer(new Uint8Array())).toBe(false);
        expect(isBuffer(new Int8Array())).toBe(false);
        expect(isBuffer(new Int16Array())).toBe(false);
        expect(isBuffer(new Uint16Array())).toBe(false);
    });

    test('测试2', () => {
        expect(isBuffer(Buffer.from('x'))).toBe(true);
        expect(isBuffer(Buffer.from([4]))).toBe(true);
        expect(isBuffer(Buffer.alloc(4))).toBe(true);
        expect(isBuffer(Buffer.allocUnsafeSlow(100))).toBe(true);
    });

    test('测试3', () => {
        const b = Buffer.from('hello');
        b.constructor = String;
        expect(isBuffer(b)).toBe(true);
        expect(b.constructor === Buffer).toBe(false);
        // @ts-ignore
        expect(typeof b.constructor.isBuffer).toBe('undefined');
    });
});
