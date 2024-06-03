import { isSharedArrayBuffer } from '..';

describe('@curong/types/isSharedArrayBuffer', () => {
    test('测试1', () => {
        expect(isSharedArrayBuffer(new ArrayBuffer(10))).toBe(false);
    });

    test('测试2', () => {
        expect(isSharedArrayBuffer(new SharedArrayBuffer(10))).toBe(true);
    });
});
