import { isIP } from '..';

describe('@curong/regexp/isIP', () => {
    test('测试1', () => {
        expect(isIP('::')).toBe(true);
        expect(isIP('::1')).toBe(true);
        expect(isIP('2409:8054:48::1006')).toBe(true);
        expect(isIP('[240e:e0::abcd]:65560')).toBe(false);
        expect(isIP('[240e:e0::abcd]:655601')).toBe(false);
        expect(isIP('[240e:g0::abcd]:65530')).toBe(false);
    });

    test('测试2', () => {
        expect(isIP('127.0.0.1')).toBe(true);
        expect(isIP('10.0.0.1')).toBe(true);
        expect(isIP('192.168.0.1')).toBe(true);
    });
});

