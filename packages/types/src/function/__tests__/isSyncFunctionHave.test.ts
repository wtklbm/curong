import { isSyncFunctionHave } from '..';

describe('@curong/types/isSyncFunctionHave', () => {
    test('测试1', () => {
        expect(isSyncFunctionHave(null)).toBe(false);
        expect(isSyncFunctionHave(undefined)).toBe(false);
        expect(isSyncFunctionHave(1)).toBe(false);
        expect(isSyncFunctionHave('1')).toBe(false);
        expect(isSyncFunctionHave(false)).toBe(false);
    });

    test('测试2', () => {
        expect(isSyncFunctionHave(new Function('xxx'))).toBe(false);

        expect(isSyncFunctionHave(function a() {})).toBe(false);
        expect(isSyncFunctionHave(async function a() {})).toBe(false);

        expect(isSyncFunctionHave(() => {})).toBe(false);
        expect(isSyncFunctionHave(async () => {})).toBe(false);

        expect(isSyncFunctionHave(function () {})).toBe(false);
        expect(isSyncFunctionHave(async function fn() {})).toBe(false);

        expect(isSyncFunctionHave(function* () {})).toBe(false);
        expect(isSyncFunctionHave(async function* () {})).toBe(false);
    });

    test('测试3', () => {
        expect(isSyncFunctionHave(function a(a: any) {})).toBe(true);
        expect(isSyncFunctionHave(async function a(a: any) {})).toBe(false);

        expect(isSyncFunctionHave((a: any) => {})).toBe(true);
        expect(isSyncFunctionHave(async (a: any) => {})).toBe(false);

        expect(isSyncFunctionHave(function (a: any) {})).toBe(true);
        expect(isSyncFunctionHave(async function fn(a: any) {})).toBe(false);

        expect(isSyncFunctionHave(function* (a: any) {})).toBe(true);
        expect(isSyncFunctionHave(async function* (a: any) {})).toBe(false);
    });
});
