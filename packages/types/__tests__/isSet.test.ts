import { isSet } from '../src';

describe('@curong/types/isSet', () => {
    test('测试1', () => {
        expect(isSet(new Map())).toBe(false);
    });

    test('测试2', () => {
        expect(isSet(new Set())).toBe(true);
    });
});
