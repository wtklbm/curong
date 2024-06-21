import { isBufferArray } from '..';

describe('@curong/types/isBufferArray', () => {
    test('测试1', () => {
        expect(isBufferArray(0)).toBe(false);
        expect(isBufferArray('')).toBe(false);
        expect(isBufferArray(Buffer.from(''))).toBe(false);
        expect(isBufferArray([])).toBe(false);
        expect(isBufferArray([Buffer.from(''), 1])).toBe(false);
        expect(isBufferArray([Buffer.from(''), ''])).toBe(false);
        expect(isBufferArray([Buffer.from(''), true])).toBe(false);
    });

    test('测试2', () => {
        expect(isBufferArray([Buffer.from('')])).toBe(true);
        expect(isBufferArray([Buffer.from(''), Buffer.from('')])).toBe(true);
    });
});
