import { isInt8Array } from '../src';

describe('@curong/types/isInt8Array', () => {
    test('测试1', () => {
        expect(isInt8Array(new Int16Array())).toBe(false);
    });

    test('测试2', () => {
        expect(isInt8Array(new Int8Array())).toBe(true);
    });
});
