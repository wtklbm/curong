import { isFunctionHave } from '..';

describe('@curong/types/isFunctionHave', () => {
    test('测试1', () => {
        expect(isFunctionHave(12)).toBe(false);
        expect(isFunctionHave([1])).toBe(false);
    });

    test('测试2', () => {
        expect(isFunctionHave(new Function())).toBe(false);
        expect(isFunctionHave(function a() {})).toBe(false);
        expect(isFunctionHave(async function a() {})).toBe(false);
        expect(isFunctionHave(function A() {})).toBe(false);
        expect(isFunctionHave(async function A() {})).toBe(false);
        expect(isFunctionHave(() => {})).toBe(false);
        expect(isFunctionHave(function () {})).toBe(false);
        expect(isFunctionHave(async function fn() {})).toBe(false);
        expect(isFunctionHave(async () => {})).toBe(false);
        expect(isFunctionHave(function* () {})).toBe(false);
        expect(isFunctionHave(async function* () {})).toBe(false);

        expect(isFunctionHave(function a(a: any) {})).toBe(true);
        expect(isFunctionHave(async function a(a: any) {})).toBe(true);
        expect(isFunctionHave(function A(a: any) {})).toBe(true);
        expect(isFunctionHave(async function A(a: any) {})).toBe(true);
        expect(isFunctionHave((a: any) => {})).toBe(true);
        expect(isFunctionHave(function (a: any) {})).toBe(true);
        expect(isFunctionHave(async function fn(a: any) {})).toBe(true);
        expect(isFunctionHave(async (a: any) => {})).toBe(true);
        expect(isFunctionHave(function* (a: any) {})).toBe(true);
        expect(isFunctionHave(async function* (a: any) {})).toBe(true);
    });

    test('测试3', () => {
        expect(
            isFunctionHave(function (a: any, b: any) {
                return a + b;
            })
        ).toBe(true);
    });
});
