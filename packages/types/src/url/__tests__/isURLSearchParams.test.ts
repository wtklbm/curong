import { isURLSearchParams } from '..';

describe('@curong/types/isURLSearchParams', () => {
    test('测试1', () => {
        expect(isURLSearchParams({})).toBe(false);
        expect(isURLSearchParams(new URLSearchParams())).toBe(true);
    });
});
