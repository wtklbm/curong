import { isNumber, isNumberHave, isNumberSafe, isSome } from '../src';

describe('@curong/types/isSome', () => {
    test('测试1', () => {
        expect(isSome(1, v => v > 0)).toBe(true);
    });

    test('测试2', () => {
        expect(isSome(0, v => v > 0)).toBe(false);
    });

    test('测试3', () => {
        expect(isSome([0, 5, -1], v => v > 0)).toBe(true);
        expect(isSome([1, 2, 3], v => v > 2)).toBe(true);
        expect(isSome([1, 2, 3], [v => v > 1, v => v < 3])).toBe(true);
    });

    test('测试4', () => {
        expect(isSome([0, -1, -2], v => v > 0)).toBe(false);
    });

    test('测试5', () => {
        expect(isSome(5, [v => v > 0, v => v < 10])).toBe(true);
    });

    test('测试6', () => {
        expect(isSome(-1, [v => v > 0, v => v < 10])).toBe(false);
    });

    test('测试7', () => {
        expect(isSome([0, 5, -1], [v => v > 0, v => v < 10])).toBe(true);
    });

    test('测试8', () => {
        expect(isSome([0, -1, -2], [v => v > 0, v => v < 10])).toBe(false);
    });

    test('测试9', () => {
        const v: any[] = [1, 2, 3];
        const fns: any[] = [isNumber, isNumberSafe, isNumberHave];
        expect(isSome(v, fns)).toBe(true);

        fns.push((v: any) => typeof v === 'string');
        expect(isSome(v, fns)).toBe(false);
        fns.pop();

        v.push('1');
        expect(isSome(v, fns)).toBe(true);
    });
});
