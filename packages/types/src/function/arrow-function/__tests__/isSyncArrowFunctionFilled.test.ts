import { isSyncArrowFunctionFilled } from '..';

describe('@curong/types/isSyncArrowFunctionFilled', () => {
    test('测试1', () => {
        expect(isSyncArrowFunctionFilled(() => {})).toBe(false);
        expect(isSyncArrowFunctionFilled((a: any) => {})).toBe(true);
        expect(isSyncArrowFunctionFilled(async () => {})).toBe(false);
        expect(isSyncArrowFunctionFilled(async (a: any) => {})).toBe(false);
    });
});
