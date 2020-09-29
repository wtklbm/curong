import { isAnyError } from '../src';

describe('@curong/types/isAnyError', () => {
    test('测试1', () => {
        expect(isAnyError({})).toBe(false);
    });

    test('测试2', () => {
        expect(isAnyError(new Error())).toBe(true);
        expect(isAnyError(new TypeError())).toBe(true);
        expect(isAnyError(new SyntaxError())).toBe(true);
        expect(isAnyError(new EvalError())).toBe(true);
        expect(isAnyError(new ReferenceError())).toBe(true);
        expect(isAnyError(new RangeError())).toBe(true);
    });
});
