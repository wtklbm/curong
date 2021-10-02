import { isIterator } from '../src';

describe('@curong/types/isIterator', () => {
    test('测试1', () => {
        expect(isIterator(new Function())).toBe(false);
    });

    test('测试2', () => {
        function* test() {}
        expect(isIterator(test())).toBe(true);
    });
});
