import { isUint16Array } from '..';

describe('@curong/types/isUint16Array', () => {
    test('测试1', () => {
        expect(isUint16Array(new Uint32Array())).toBe(false);
    });

    test('测试2', () => {
        expect(isUint16Array(new Uint16Array())).toBe(true);
    });
});
