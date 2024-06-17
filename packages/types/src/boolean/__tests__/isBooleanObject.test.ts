import { isBooleanObject } from '..';

describe('@curong/types/isBooleanObject', () => {
    test('测试1', () => {
        expect(isBooleanObject(false)).toBe(false);
    });

    test('测试2', () => {
        expect(isBooleanObject(new Boolean(false))).toBe(true);
    });
});
