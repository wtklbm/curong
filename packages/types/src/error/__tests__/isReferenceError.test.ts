import { isReferenceError } from '..';

describe('@curong/types/isReferenceError', () => {
    test('测试1', () => {
        expect(isReferenceError(new Error())).toBe(false);
    });

    test('测试2', () => {
        expect(isReferenceError(new ReferenceError())).toBe(true);
    });
});
