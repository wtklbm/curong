import { isAsyncFunctionHave } from '..';

describe('@curong/types/isAsyncFunctionHave', () => {
    test('测试1', () => {
        expect(isAsyncFunctionHave(null)).toBe(false);
        expect(isAsyncFunctionHave(undefined)).toBe(false);
        expect(isAsyncFunctionHave(1)).toBe(false);
        expect(isAsyncFunctionHave('1')).toBe(false);
        expect(isAsyncFunctionHave(false)).toBe(false);
    });

    test('测试2', () => {
        expect(isAsyncFunctionHave(new Function('xxx'))).toBe(false);

        expect(isAsyncFunctionHave(function a() {})).toBe(false);
        expect(isAsyncFunctionHave(async function a() {})).toBe(false);

        expect(isAsyncFunctionHave(() => {})).toBe(false);
        expect(isAsyncFunctionHave(async () => {})).toBe(false);

        expect(isAsyncFunctionHave(function () {})).toBe(false);
        expect(isAsyncFunctionHave(async function fn() {})).toBe(false);

        expect(isAsyncFunctionHave(function* () {})).toBe(false);
        expect(isAsyncFunctionHave(async function* () {})).toBe(false);
    });

    test('测试3', () => {
        expect(isAsyncFunctionHave(function a(a: any) {})).toBe(false);
        expect(isAsyncFunctionHave(async function a(a: any) {})).toBe(true);

        expect(isAsyncFunctionHave((a: any) => {})).toBe(false);
        expect(isAsyncFunctionHave(async (a: any) => {})).toBe(true);

        expect(isAsyncFunctionHave(function (a: any) {})).toBe(false);
        expect(isAsyncFunctionHave(async function fn(a: any) {})).toBe(true);

        expect(isAsyncFunctionHave(function* (a: any) {})).toBe(false);
        expect(isAsyncFunctionHave(async function* (a: any) {})).toBe(true);
    });
});
