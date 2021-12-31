import { flat } from '../src';

describe('@curong/array/flat', () => {
    test('测试1', () => {
        expect(flat([1, [[[[[[[2]]]]]]], [3, [4], [[[[5]]]], 6]])).toEqual([
            1, 2, 3, 4, 5, 6
        ]);
    });
});
