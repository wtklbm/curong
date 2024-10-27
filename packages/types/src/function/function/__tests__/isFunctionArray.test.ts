import { isFunctionArray } from '..';

describe('@curong/types/isFunctionArray', () => {
    test('测试1', () => {
        expect(isFunctionArray([])).toBe(false);
        expect(isFunctionArray([1])).toBe(false);
        expect(isFunctionArray(0)).toBe(false);
        expect(isFunctionArray('')).toBe(false);
        expect(isFunctionArray(2)).toBe(false);
        expect(isFunctionArray([2, '1'])).toBe(false);
        expect(isFunctionArray([2, true])).toBe(false);
    });

    test('测试2', () => {
        expect(isFunctionArray([new Function()])).toBe(true);

        expect(isFunctionArray([function a() {}])).toBe(true);
        expect(isFunctionArray([async function fn() {}])).toBe(true);

        expect(isFunctionArray([() => {}])).toBe(true);
        expect(isFunctionArray([async () => {}])).toBe(true);

        expect(isFunctionArray([async function a() {}])).toBe(true);
        expect(isFunctionArray([function (a: any) {}])).toBe(true);

        expect(isFunctionArray([function* () {}])).toBe(true);
        expect(isFunctionArray([async function* () {}])).toBe(true);
    });

    test('测试3', () => {
        expect(isFunctionArray([0, new Function()])).toBe(false);

        expect(isFunctionArray([0, function a() {}])).toBe(false);
        expect(isFunctionArray([0, async function a() {}])).toBe(false);

        expect(isFunctionArray([0, async () => {}])).toBe(false);
        expect(isFunctionArray([0, () => {}])).toBe(false);

        expect(isFunctionArray([0, function (a: any) {}])).toBe(false);
        expect(isFunctionArray([0, async function fn() {}])).toBe(false);

        expect(isFunctionArray([0, function* () {}])).toBe(false);
        expect(isFunctionArray([0, async function* () {}])).toBe(false);
    });

    test('测试4', () => {
        expect(isFunctionArray([() => 1])).toBe(true);
        expect(isFunctionArray([() => 0, true])).toBe(false);
        expect(isFunctionArray([() => 1, async () => 1])).toBe(true);
    });
});
