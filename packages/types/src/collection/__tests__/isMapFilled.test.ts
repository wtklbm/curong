import { isMapFilled } from '..';

describe('@curong/types/isMapFilled', () => {
    test('测试1', () => {
        expect(isMapFilled(new Map())).toBe(false);
    });

    test('测试2', () => {
        expect(isMapFilled(new Map([[1, 2]]))).toBe(true);
    });
});
