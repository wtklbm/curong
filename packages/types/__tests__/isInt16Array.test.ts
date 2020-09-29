import { isInt16Array } from '../src';

describe('@curong/types/isInt16Array', () => {
    test('测试1', () => {
        expect(isInt16Array(new Int32Array())).toBe(false);
    });

    test('测试2', () => {
        expect(isInt16Array(new Int16Array())).toBe(true);
    });
});
