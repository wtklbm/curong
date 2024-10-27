import { isAsyncArrowFunction } from '..';

describe('@curong/types/isAsyncArrowFunction', () => {
    test('测试1', () => {
        expect(isAsyncArrowFunction(() => {})).toBe(false);
        expect(isAsyncArrowFunction(async (a: any) => {})).toBe(true);
    });
});
