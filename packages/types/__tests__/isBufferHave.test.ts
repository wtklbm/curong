import { isBufferHave } from '../src';

describe('@curong/types/isBufferHave', () => {
    test('测试1', () => {
        expect(isBufferHave(12)).toBe(false);
    });

    test('测试2', () => {
        expect(isBufferHave(Buffer.from('x'))).toBe(true);
    });

    test('测试3', () => {
        expect(isBufferHave(Buffer.from(''))).toBe(false);
    });
});
