import { dimensionLevel } from '..';

describe('@curong/array/dimensionLevel', () => {
    test('测试1', () => {
        expect(dimensionLevel([])).toEqual(1);
        expect(dimensionLevel([1, 2, 3])).toEqual(1);
        expect(dimensionLevel([1, [], 3])).toEqual(1);
        expect(
            dimensionLevel([1, [[[[[[[2]]]]]]], [3, [4], [[[[5]]]], 6]])
        ).toEqual(1);
    });

    test('测试2', () => {
        expect(dimensionLevel([[]])).toEqual(2);
        expect(
            dimensionLevel([
                [1, 2],
                [3, 4]
            ])
        ).toEqual(2);
        expect(
            dimensionLevel([
                [[], 1],
                [3, 4]
            ])
        ).toEqual(2);
        expect(
            dimensionLevel([
                [[], 1],
                [[], 4]
            ])
        ).toEqual(2);
        expect(
            dimensionLevel([
                [1, []],
                [3, 4]
            ])
        ).toEqual(2);
        expect(
            dimensionLevel([
                [[], []],
                [3, []]
            ])
        ).toEqual(2);
        expect(
            dimensionLevel([
                [1, []],
                [3, []]
            ])
        ).toEqual(2);
        expect(
            dimensionLevel([
                [[], []],
                [[], 4]
            ])
        ).toEqual(2);
        expect(
            dimensionLevel([
                [[], []],
                [[], []]
            ])
        ).toEqual(3);

        expect(dimensionLevel([[[]]])).toEqual(3);
        expect(dimensionLevel([[[1, 2]], [[3, 4]]])).toEqual(3);

        expect(dimensionLevel([[[[]]]])).toEqual(4);
        expect(dimensionLevel([[[1, []]], [[[], 4]]])).toEqual(3);
    });

    test('测试2', () => {
        expect(dimensionLevel([[[]]])).toEqual(3);
        expect(
            dimensionLevel([
                [
                    [1, 2],
                    [3, 4]
                ]
            ])
        ).toEqual(3);
        expect(
            dimensionLevel([
                [
                    [[], 1],
                    [3, 4]
                ]
            ])
        ).toEqual(3);
        expect(
            dimensionLevel([
                [
                    [[], 1],
                    [[], 4]
                ]
            ])
        ).toEqual(3);
        expect(
            dimensionLevel([
                [
                    [1, []],
                    [3, 4]
                ]
            ])
        ).toEqual(3);
        expect(
            dimensionLevel([
                [
                    [[], []],
                    [3, []]
                ]
            ])
        ).toEqual(3);
        expect(
            dimensionLevel([
                [
                    [1, []],
                    [3, []]
                ]
            ])
        ).toEqual(3);
        expect(
            dimensionLevel([
                [
                    [[], []],
                    [[], 4]
                ]
            ])
        ).toEqual(3);
        expect(
            dimensionLevel([
                [
                    [[], []],
                    [[], []]
                ]
            ])
        ).toEqual(4);
    });
});
