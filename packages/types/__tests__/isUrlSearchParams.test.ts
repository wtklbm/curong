import { isUrlSearchParams } from '../src';

describe('@curong/types/isUrlSearchParams', () => {
    test('测试1', () => {
        expect(isUrlSearchParams({})).toBe(false);
        expect(isUrlSearchParams(new URLSearchParams())).toBe(true);
    });
});
