import { isArrowFunctionFilled } from '..';

describe('@curong/types/isArrowFunctionFilled', () => {
    test('测试1', () => {
        expect(isArrowFunctionFilled(() => {})).toBe(false);
        expect(isArrowFunctionFilled((a: any) => {})).toBe(true);

        expect(isArrowFunctionFilled(async () => {})).toBe(false);
        expect(isArrowFunctionFilled(async (a: any) => {})).toBe(true);
    });
});
