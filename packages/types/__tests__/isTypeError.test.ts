import { isTypeError } from '../src';

describe('@curong/types/isTypeError', () => {
    test('测试1', () => {
        expect(isTypeError(new Error())).toBe(false);
    });

    test('测试2', () => {
        expect(isTypeError(new TypeError())).toBe(true);
    });
});
