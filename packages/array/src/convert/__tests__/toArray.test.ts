import { toArray } from '..';

describe('@curong/array/toArray', () => {
    test('测试1', () => {
        expect(toArray([])).toEqual([]);
        expect(toArray([1, 2, 3])).toEqual([1, 2, 3]);
    });
    test('测试2', () => {
        const print = function () {
            const args = toArray(arguments);
            expect(args).toEqual([1, 32, 43, 54, 2, 32]);
        };

        // @ts-ignore
        print(1, 32, 43, 54, 2, 32);

        expect(
            toArray({
                0: 't',
                1: 'o',
                length: 2
            })
        ).toEqual(['t', 'o']);
    });
});
