import { isMap } from '..';

describe('@curong/types/isMap', () => {
    test('测试1', () => {
        expect(isMap(new Set())).toBe(false);
    });

    test('测试2', () => {
        expect(isMap(new Map())).toBe(true);
    });
});
