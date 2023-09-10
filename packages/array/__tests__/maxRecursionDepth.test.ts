import { maxRecursionDepth } from '../src';

describe('maxRecursionDepth', () => {
    test('should return 1 for empty array', () => {
        expect(maxRecursionDepth([])).toBe(1);
    });

    test('should return 1 for single-level array', () => {
        expect(maxRecursionDepth([1, 2, 3])).toBe(1);
        expect(maxRecursionDepth(['a', 'b', 'c'])).toBe(1);
        expect(maxRecursionDepth([null, undefined, ''])).toBe(1);
    });

    test('should return correct depth for 2D array', () => {
        expect(
            maxRecursionDepth([
                [1, 2],
                [3, 4]
            ])
        ).toBe(2);
        expect(maxRecursionDepth([['a'], ['b', 'c']])).toBe(2);
        expect(maxRecursionDepth([[], [1, 2, 3]])).toBe(2);
    });

    test('should return correct depth for 3D array', () => {
        expect(
            maxRecursionDepth([
                [
                    [1, 2],
                    [3, 4]
                ],
                [
                    [5, 6],
                    [7, 8]
                ]
            ])
        ).toBe(3);
        expect(
            maxRecursionDepth([
                [[1], [2]],
                [
                    [3, 4],
                    [5, 6]
                ]
            ])
        ).toBe(3);
        expect(
            maxRecursionDepth([
                [
                    [
                        [1, 2],
                        [3, 4]
                    ]
                ],
                [
                    [
                        [5, 6],
                        [7, 8]
                    ]
                ]
            ])
        ).toBe(4);

        expect(
            maxRecursionDepth([
                [
                    [
                        [1, 2],
                        [3, 4]
                    ]
                ],
                [
                    [5, 6],
                    [7, 8]
                ]
            ])
        ).toBe(4);

        expect(
            maxRecursionDepth([
                [
                    [
                        [1, 2],
                        [3, 4]
                    ]
                ],
                [5, 6]
            ])
        ).toBe(4);
    });

    test('should return correct depth for array with empty nested arrays', () => {
        expect(maxRecursionDepth([[], [], []])).toBe(2);
        expect(maxRecursionDepth([[[]], [[]]])).toBe(3);
        expect(maxRecursionDepth([[[[]]]])).toBe(4);
    });
});
