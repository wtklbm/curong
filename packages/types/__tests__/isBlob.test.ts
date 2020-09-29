import { isBlob } from '../src';

describe('@curong/types/isBlob', () => {
    test('测试1', () => {
        expect(isBlob(new Blob())).toBe(true);
    });
});
