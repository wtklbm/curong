import { isFunction } from '../src';

describe('@curong/types/isFunction', () => {
    test('测试1', () => {
        expect(isFunction(12)).toBe(false);
        expect(isFunction([1])).toBe(false);
    });

    test('测试2', () => {
        expect(isFunction(new Function())).toBe(true);
        expect(isFunction(function a() {})).toBe(true);
        expect(isFunction(async function a() {})).toBe(true);
        expect(isFunction(function A() {})).toBe(true);
        expect(isFunction(async function A() {})).toBe(true);
        expect(isFunction(() => {})).toBe(true);
        expect(isFunction(async () => {})).toBe(true);
    });
});
