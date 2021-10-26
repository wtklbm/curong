import { isIp } from '../src';

describe('@curong/regexp/isIp', () => {
    test('测试1', () => {
        expect(isIp('2409:8054:48::1006')).toBe(true);
        expect(isIp('[240e:e0::abcd]:65533')).toBe(true);
        expect(isIp('[240e:e0::abcd]:65560')).toBe(false);
        expect(isIp('[240e:e0::abcd]:655601')).toBe(false);
        expect(isIp('[240e:g0::abcd]:65530')).toBe(false);
    });
});
