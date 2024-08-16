import { isErrorLike } from '..';

describe('@curong/types/isErrorLike', () => {
    test('测试1', () => {
        expect(isErrorLike(new Error(''))).toBe(true);
        expect(isErrorLike(new TypeError(''))).toBe(true);
    });

    test('测试2', () => {
    });
});
