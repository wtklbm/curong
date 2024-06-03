import { isRangeError } from '..';

describe('@curong/types/isRangeError', () => {
    test('测试1', () => {
        expect(isRangeError(new Error())).toBe(false);
    });

    test('测试2', () => {
        expect(isRangeError(new RangeError())).toBe(true);
    });
});
