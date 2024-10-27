import { isFunctionFilled } from '..';

describe('@curong/types/isFunctionFilled', () => {
    test('测试1', () => {
        expect(isFunctionFilled(12)).toBe(false);
        expect(isFunctionFilled([1])).toBe(false);
    });

    test('测试2', () => {
        expect(isFunctionFilled(new Function())).toBe(false);
        expect(isFunctionFilled(function a() {})).toBe(false);
        expect(isFunctionFilled(async function a() {})).toBe(false);
        expect(isFunctionFilled(function A() {})).toBe(false);
        expect(isFunctionFilled(async function A() {})).toBe(false);
        expect(isFunctionFilled(() => {})).toBe(false);
        expect(isFunctionFilled(function () {})).toBe(false);
        expect(isFunctionFilled(async function fn() {})).toBe(false);
        expect(isFunctionFilled(async () => {})).toBe(false);
        expect(isFunctionFilled(function* () {})).toBe(false);
        expect(isFunctionFilled(async function* () {})).toBe(false);

        expect(isFunctionFilled(function a(a: any) {})).toBe(true);
        expect(isFunctionFilled(async function a(a: any) {})).toBe(true);
        expect(isFunctionFilled(function A(a: any) {})).toBe(true);
        expect(isFunctionFilled(async function A(a: any) {})).toBe(true);
        expect(isFunctionFilled((a: any) => {})).toBe(true);
        expect(isFunctionFilled(function (a: any) {})).toBe(true);
        expect(isFunctionFilled(async function fn(a: any) {})).toBe(true);
        expect(isFunctionFilled(async (a: any) => {})).toBe(true);
        expect(isFunctionFilled(function* (a: any) {})).toBe(true);
        expect(isFunctionFilled(async function* (a: any) {})).toBe(true);
    });

    test('测试3', () => {
        expect(
            isFunctionFilled(function (a: any, b: any) {
                return a + b;
            })
        ).toBe(true);
    });
});
