import { isAsyncFunction } from '..';

describe('@curong/types/isAsyncFunction', () => {
    test('测试1', () => {
        expect(isAsyncFunction(() => {})).toBe(false);
    });

    test('测试2', () => {
        expect(isAsyncFunction(new Function('xxx'))).toBe(false);
        expect(isAsyncFunction(new Function('return async () => {}'))).toBe(false);

        expect(isAsyncFunction(function a() {})).toBe(false);
        expect(isAsyncFunction(async function a() {})).toBe(true);

        expect(isAsyncFunction(() => {})).toBe(false);
        expect(isAsyncFunction(async () => {})).toBe(true);

        expect(isAsyncFunction(function (a: any) {})).toBe(false);
        expect(isAsyncFunction(async function fn() {})).toBe(true);

        expect(isAsyncFunction(function* () {})).toBe(false);
        expect(isAsyncFunction(async function* () {})).toBe(true);
    });
});
