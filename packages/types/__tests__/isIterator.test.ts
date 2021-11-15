import { isIterator } from '../src';

describe('@curong/types/isIterator', () => {
    test('测试1', () => {
        expect(isIterator(new Function())).toBe(false);
        expect(isIterator("")).toBe(false);
        expect(isIterator(0)).toBe(false);
        expect(isIterator(false)).toBe(false);
        expect(isIterator(undefined)).toBe(false);
        expect(isIterator(null)).toBe(false);
        expect(isIterator([])).toBe(false);
    });

    test('测试2', () => {
        function* test() {}
        expect(isIterator(test())).toBe(true);
    });
});
