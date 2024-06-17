import { isUint32Array } from '..';

describe('@curong/types/isUint32Array', () => {
    test('测试1', () => {
        expect(isUint32Array(new Uint16Array())).toBe(false);
    });

    test('测试2', () => {
        expect(isUint32Array(new Uint32Array())).toBe(true);
    });
});
