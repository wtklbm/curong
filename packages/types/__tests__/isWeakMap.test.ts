import { isWeakMap } from '../src';

describe('@curong/types/isWeakMap', () => {
    test('测试1', () => {
        expect(isWeakMap(new WeakSet())).toBe(false);
    });

    test('测试2', () => {
        expect(isWeakMap(new WeakMap())).toBe(true);
    });
});
