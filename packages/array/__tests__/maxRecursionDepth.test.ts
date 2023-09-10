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

    test('handles empty array', () => {
        expect(maxRecursionDepth([], false)).toBe(0);
    });

    test('handles nested empty arrays', () => {
        expect(maxRecursionDepth([[], [[[]]], [[]]], false)).toBe(0);
    });

    test('handles basic array', () => {
        expect(maxRecursionDepth([5, 4, 3, 2, 1], false)).toBe(1);
    });

    test('handles basic with one nested empty array', () => {
        expect(maxRecursionDepth([5, [], 4, 3, [], 1, []], false)).toBe(1);
    });

    test('handles numbers and strings with strings deeper', () => {
        expect(maxRecursionDepth([5, [], 4, 3, ['hello'], 1], false)).toBe(2);
    });

    test('handles numbers and strings with numbers deeper', () => {
        expect(maxRecursionDepth(['hello', [2, []]], false)).toBe(2);
    });

    test('handles very deep arrays', () => {
        expect(
            maxRecursionDepth([2, [3, [], [4]], [[4, [8, ['15']], 5]]], false)
        ).toBe(5);
    });
});
