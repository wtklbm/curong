import { isSyncFunctionFilled } from '..';

describe('@curong/types/isSyncFunctionFilled', () => {
    test('测试1', () => {
        expect(isSyncFunctionFilled(null)).toBe(false);
        expect(isSyncFunctionFilled(undefined)).toBe(false);
        expect(isSyncFunctionFilled(1)).toBe(false);
        expect(isSyncFunctionFilled('1')).toBe(false);
        expect(isSyncFunctionFilled(false)).toBe(false);
    });

    test('测试2', () => {
        expect(isSyncFunctionFilled(new Function('xxx'))).toBe(false);

        expect(isSyncFunctionFilled(function a() {})).toBe(false);
        expect(isSyncFunctionFilled(async function a() {})).toBe(false);

        expect(isSyncFunctionFilled(() => {})).toBe(false);
        expect(isSyncFunctionFilled(async () => {})).toBe(false);

        expect(isSyncFunctionFilled(function () {})).toBe(false);
        expect(isSyncFunctionFilled(async function fn() {})).toBe(false);

        expect(isSyncFunctionFilled(function* () {})).toBe(false);
        expect(isSyncFunctionFilled(async function* () {})).toBe(false);
    });

    test('测试3', () => {
        expect(isSyncFunctionFilled(function a(a: any) {})).toBe(true);
        expect(isSyncFunctionFilled(async function a(a: any) {})).toBe(false);

        expect(isSyncFunctionFilled((a: any) => {})).toBe(true);
        expect(isSyncFunctionFilled(async (a: any) => {})).toBe(false);

        expect(isSyncFunctionFilled(function (a: any) {})).toBe(true);
        expect(isSyncFunctionFilled(async function fn(a: any) {})).toBe(false);

        expect(isSyncFunctionFilled(function* (a: any) {})).toBe(true);
        expect(isSyncFunctionFilled(async function* (a: any) {})).toBe(false);
    });
});
