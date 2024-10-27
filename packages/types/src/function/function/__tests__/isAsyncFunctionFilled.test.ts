import { isAsyncFunctionFilled } from '..';

describe('@curong/types/isAsyncFunctionFilled', () => {
    test('测试1', () => {
        expect(isAsyncFunctionFilled(null)).toBe(false);
        expect(isAsyncFunctionFilled(undefined)).toBe(false);
        expect(isAsyncFunctionFilled(1)).toBe(false);
        expect(isAsyncFunctionFilled('1')).toBe(false);
        expect(isAsyncFunctionFilled(false)).toBe(false);
    });

    test('测试2', () => {
        expect(isAsyncFunctionFilled(new Function('xxx'))).toBe(false);

        expect(isAsyncFunctionFilled(function a() {})).toBe(false);
        expect(isAsyncFunctionFilled(async function a() {})).toBe(false);

        expect(isAsyncFunctionFilled(() => {})).toBe(false);
        expect(isAsyncFunctionFilled(async () => {})).toBe(false);

        expect(isAsyncFunctionFilled(function () {})).toBe(false);
        expect(isAsyncFunctionFilled(async function fn() {})).toBe(false);

        expect(isAsyncFunctionFilled(function* () {})).toBe(false);
        expect(isAsyncFunctionFilled(async function* () {})).toBe(false);
    });

    test('测试3', () => {
        expect(isAsyncFunctionFilled(function a(a: any) {})).toBe(false);
        expect(isAsyncFunctionFilled(async function a(a: any) {})).toBe(true);

        expect(isAsyncFunctionFilled((a: any) => {})).toBe(false);
        expect(isAsyncFunctionFilled(async (a: any) => {})).toBe(true);

        expect(isAsyncFunctionFilled(function (a: any) {})).toBe(false);
        expect(isAsyncFunctionFilled(async function fn(a: any) {})).toBe(true);

        expect(isAsyncFunctionFilled(function* (a: any) {})).toBe(false);
        expect(isAsyncFunctionFilled(async function* (a: any) {})).toBe(true);
    });
});
