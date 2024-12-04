import { uniq } from '..';

describe('@curong/array/uniq', () => {
    test('测试1', () => {
        expect(uniq([])).toEqual([]);
    });

    test('测试2', () => {
        const a1 = [1, 2, 3];
        const a2 = [4, 5, 6, 1, 2, 3];
        const a3 = [4, 5, 6, 7, 8, 9];

        expect(uniq(a1, a2, a3)).toEqual([
            1, 2, 3, 4, 5, 6, 7, 8, 9
        ]);
    });

    test('测试3', () => {
        const a1 = [1, 2, 3];
        const a2 = [4, 5, 6, 1, 2, 3];
        const a3 = [4, 5, 6, 7, 8, 9];
        const a = uniq(a1, 3, 4, 5, 12, a2, a3, 21);

        expect(a).toEqual([1, 2, 3, 4, 5, 12, 6, 7, 8, 9, 21]);
    });

    test('测试3', () => {
        const uniNumber = uniq(1, [2, 2, 1, 3, 4]);
        expect(uniNumber).toEqual([1, 2, 3, 4]);

        const uniString = uniq('1', ['2', '2', '1', '3', '4']);
        expect(uniString).toEqual(['1', '2', '3', '4']);

        // @ts-ignore
        const uniBigInt = uniq(1n, [2n, 2n, 1n, 3n, 4n]);
        // @ts-ignore
        expect(uniBigInt).toEqual([1n, 2n, 3n, 4n]);

        const uniBool = uniq(true, [false, true], false, true);
        expect(uniBool).toEqual([true, false]);

        const uniNull = uniq(null, [null, null], null);
        expect(uniNull).toEqual([null]);

        const uniUndefined = uniq(
            undefined,
            [undefined, undefined],
            undefined
        );

        expect(uniUndefined).toEqual([undefined]);
    });

    test('测试4', () => {
        const uniS1 = uniq(Symbol('1'), [
            Symbol('2'),
            Symbol('1')
        ]);
        expect(uniS1.length).toBe(3);

        const s1 = Symbol('1');
        const s2 = Symbol('2');
        const UniS2 = uniq(s1, s2, [s2, s1]);
        expect(UniS2.length).toBe(2);
    });

    test('测试5', () => {
        const numbers = [1, 2, 3, 2, 1];
        expect(uniq(numbers)).toEqual([1, 2, 3]);
    });

    test('测试6', () => {
        const fruits = ['apple', 'banana', 'apple', 'orange', 'banana'];
        expect(uniq(fruits)).toEqual([
            'apple',
            'banana',
            'orange'
        ]);
    });

    test('测试7', () => {
        const mixedArray = [1, 'apple', true, 1, 'apple', true];
        expect(uniq(mixedArray)).toEqual([1, 'apple', true]);
    });

    test('测试8', () => {
        const emptyArray: any[] = [];
        expect(uniq(emptyArray)).toEqual([]);
    });

    test('测试9', () => {
        const singleElementArray = [42];
        expect(uniq(singleElementArray)).toEqual([42]);
    });

    test('测试10', () => {
        const arrayWithNullAndUndefined = [null, undefined, null, undefined];
        expect(uniq(arrayWithNullAndUndefined)).toEqual([
            null,
            undefined
        ]);
    });

    test('测试11', () => {
        const arrayWithNaN = [NaN, NaN];
        expect(uniq(arrayWithNaN)).toEqual([NaN]);
    });
});
