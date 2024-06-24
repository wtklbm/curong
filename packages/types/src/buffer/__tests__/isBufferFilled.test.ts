import { isBufferFilled } from '..';

describe('@curong/types/isBufferFilled', () => {
    test('测试1', () => {
        expect(isBufferFilled(12)).toBe(false);
    });

    test('测试2', () => {
        expect(isBufferFilled(Buffer.from('x'))).toBe(true);
    });

    test('测试3', () => {
        expect(isBufferFilled(Buffer.from(''))).toBe(false);
    });
});
