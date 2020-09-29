import { isBuffer } from '../src';

describe('@curong/types/isBuffer', () => {
    test('测试1', () => {
        expect(isBuffer(12)).toBe(false);
    });

    test('测试2', () => {
        expect(isBuffer(Buffer.from('x'))).toBe(true);
    });

    test('测试3', () => {
        expect(isBuffer([1])).toBe(false);
    });
});
