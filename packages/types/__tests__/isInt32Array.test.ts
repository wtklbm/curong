import { isInt32Array } from '../src';

describe('@curong/types/isInt32Array', () => {
    test('测试1', () => {
        expect(isInt32Array(new Int16Array())).toBe(false);
    });

    test('测试2', () => {
        expect(isInt32Array(new Int32Array())).toBe(true);
    });
});
