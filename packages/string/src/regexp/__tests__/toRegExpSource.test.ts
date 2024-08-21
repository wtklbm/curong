import { toRegExpSource } from '..';

describe('@curong/string/toRegExpSource', () => {
    test('测试1', () => {
        expect(toRegExpSource('xxx')).toBe('xxx');
        expect(toRegExpSource('+')).toBe('\\+');
    });
});
