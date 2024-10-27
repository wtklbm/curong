import { isAsyncArrowFunctionFilled } from '..';

describe('@curong/types/isAsyncArrowFunctionFilled', () => {
    test('测试1', () => {
        expect(isAsyncArrowFunctionFilled(() => {})).toBe(false);
        expect(isAsyncArrowFunctionFilled(async () => {})).toBe(false);
        expect(isAsyncArrowFunctionFilled(async (a: any) => {})).toBe(true);
    });
});
