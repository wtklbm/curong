import { isMapHave } from '..';

describe('@curong/types/isMapHave', () => {
    test('测试1', () => {
        expect(isMapHave(new Map())).toBe(false);
    });

    test('测试2', () => {
        expect(isMapHave(new Map([[1, 2]]))).toBe(true);
    });
});
