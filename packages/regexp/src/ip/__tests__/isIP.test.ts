import { isIP } from '..';

describe('@curong/regexp/isIP', () => {
    test('测试1', () => {
        expect(isIP('2409:8054:48::1006')).toBe(true);
        expect(isIP('[240e:e0::abcd]:65533')).toBe(true);
        expect(isIP('[240e:e0::abcd]:65560')).toBe(false);
        expect(isIP('[240e:e0::abcd]:655601')).toBe(false);
        expect(isIP('[240e:g0::abcd]:65530')).toBe(false);
    });
});
