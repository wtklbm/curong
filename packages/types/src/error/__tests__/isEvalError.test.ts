import { isEvalError } from '..';

describe('@curong/types/isEvalError', () => {
    test('测试1', () => {
        expect(isEvalError(new TypeError(''))).toBe(false);
    });

    test('测试2', () => {
        expect(isEvalError(new EvalError(''))).toBe(true);
    });
});
