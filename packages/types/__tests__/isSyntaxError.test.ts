import { isSyntaxError } from '../src';

describe('@curong/types/isSyntaxError', () => {
    test('测试1', () => {
        expect(isSyntaxError(new Error())).toBe(false);
    });

    test('测试2', () => {
        expect(isSyntaxError(new SyntaxError())).toBe(true);
    });
});
