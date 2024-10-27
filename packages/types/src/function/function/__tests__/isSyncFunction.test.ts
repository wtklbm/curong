import { isSyncFunction } from '..';

describe('@curong/types/isSyncFunction', () => {
    test('测试1', () => {
        expect(isSyncFunction(null)).toBe(false);
        expect(isSyncFunction(undefined)).toBe(false);
        expect(isSyncFunction([])).toBe(false);
        expect(isSyncFunction(1)).toBe(false);
        expect(isSyncFunction('1')).toBe(false);
        expect(isSyncFunction(true)).toBe(false);
    });

    test('测试2', () => {
        expect(isSyncFunction(new Function('xxx'))).toBe(true);

        expect(isSyncFunction(function a() {})).toBe(true);
        expect(isSyncFunction(async function a() {})).toBe(false);

        expect(isSyncFunction(() => {})).toBe(true);
        expect(isSyncFunction(async () => {})).toBe(false);

        expect(isSyncFunction(function (a: any) {})).toBe(true);
        expect(isSyncFunction(async function fn() {})).toBe(false);

        expect(isSyncFunction(function* () {})).toBe(true);
        expect(isSyncFunction(async function* () {})).toBe(false);
    });
});
