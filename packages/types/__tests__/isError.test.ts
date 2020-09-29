import { isError } from '../src';

describe('@curong/types/isError', () => {
    test('测试1', () => {
        expect(isError(new TypeError(''))).toBe(false);
    });

    test('测试2', () => {
        expect(isError(new Error(''))).toBe(true);
    });
});
