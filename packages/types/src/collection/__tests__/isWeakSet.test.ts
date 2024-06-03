import { isWeakSet } from '..';

describe('@curong/types/isWeakSet', () => {
    test('测试1', () => {
        expect(isWeakSet(new WeakMap())).toBe(false);
    });

    test('测试2', () => {
        expect(isWeakSet(new WeakSet())).toBe(true);
    });
});
