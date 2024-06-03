import { isFunction } from '..';

describe('@curong/types/isFunction', () => {
    test('测试1', () => {
        expect(isFunction(12)).toBe(false);
        expect(isFunction([1])).toBe(false);
    });

    test('测试2', () => {
        expect(isFunction(new Function('xxx'))).toBe(true);

        expect(isFunction(function a() {})).toBe(true);
        expect(isFunction(async function a() {})).toBe(true);

        expect(isFunction(() => {})).toBe(true);
        expect(isFunction(async () => {})).toBe(true);

        expect(isFunction(function (a: any) {})).toBe(true);
        expect(isFunction(async function fn() {})).toBe(true);

        expect(isFunction(function* () {})).toBe(true);
        expect(isFunction(async function* () {})).toBe(true);
    });
});
