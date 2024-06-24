import { isSetFilled } from '..';

describe('@curong/types/isSetFilled', () => {
    test('测试1', () => {
        expect(isSetFilled(new Set())).toBe(false);
    });

    test('测试2', () => {
        expect(isSetFilled(new Set([1]))).toBe(true);
    });
});
