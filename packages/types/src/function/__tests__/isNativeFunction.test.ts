import { isNativeFunction } from '..';

describe('@curong/types/isNativeFunction', () => {
    test('测试1', () => {
        expect(isNativeFunction(null)).toBe(false);
        expect(isNativeFunction(undefined)).toBe(false);
        expect(isNativeFunction([])).toBe(false);
        expect(isNativeFunction(1)).toBe(false);
        expect(isNativeFunction('1')).toBe(false);
        expect(isNativeFunction(true)).toBe(false);
    });

    test('测试2', () => {
        expect(isNativeFunction(new Function('xxx'))).toBe(false);
        expect(isNativeFunction(function a() {})).toBe(false);
        expect(isNativeFunction(async function a() {})).toBe(false);
        expect(isNativeFunction(() => {})).toBe(false);
        expect(isNativeFunction(async () => {})).toBe(false);
        expect(isNativeFunction(function (a: any) {})).toBe(false);
        expect(isNativeFunction(async function fn() {})).toBe(false);
        expect(isNativeFunction(function* () {})).toBe(false);
        expect(isNativeFunction(async function* () {})).toBe(false);
    });

    test('测试3', () => {
        expect(isNativeFunction(parseInt)).toBe(true);
        expect(isNativeFunction(Promise.all)).toBe(true);
        expect(isNativeFunction(''.valueOf)).toBe(true);
        expect(isNativeFunction(''.toString)).toBe(true);
    });

    test('测试4', () => {
        expect(isNativeFunction(Object.prototype.toString.bind(null))).toBe(
            false
        );
        expect(isNativeFunction(Function.toString.bind(null))).toBe(false);
    });

    test('测试5', () => {
        expect(isNativeFunction({}.toString)).toBe(true);
        expect(isNativeFunction(Object.prototype.toString)).toBe(true);
        expect(isNativeFunction(Object.prototype.toString.call)).toBe(true);

        // @ts-ignore
        Object.prototype.toString = null;
        expect(isNativeFunction({})).toBe(false);
    });
});
