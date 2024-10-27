import { isSyncArrowFunction } from '..';

describe('@curong/types/isSyncArrowFunction', () => {
    test('测试1', () => {
        expect(isSyncArrowFunction(() => {})).toBe(true);
        expect(isSyncArrowFunction((a: any) => {})).toBe(true);
        expect(isSyncArrowFunction(async () => {})).toBe(false);
        expect(isSyncArrowFunction(async (a: any) => {})).toBe(false);
    });
});
