import { fromArrayLike } from '../src';

describe('@curong/array/fromArrayLike', () => {
    test('测试1', () => {
        expect(fromArrayLike([])).toEqual([]);
        expect(fromArrayLike([1, 2, 3])).toEqual([1, 2, 3]);
    });
    test('测试2', () => {
        const print = function () {
            const args = fromArrayLike(arguments);
            expect(args).toEqual([1, 32, 43, 54, 2, 32]);
        };

        // @ts-ignore
        print(1, 32, 43, 54, 2, 32);

        expect(
            fromArrayLike({
                0: 't',
                1: 'o',
                length: 2
            })
        ).toEqual(['t', 'o']);
    });
});
