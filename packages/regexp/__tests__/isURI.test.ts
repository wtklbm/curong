import { isURI } from '../src';

describe('@curong/regexp/isURI', () => {
    test('测试1', () => {
        expect(isURI('https://www.wtklbm.com?a=b&b=c')).toBe(true);
        expect(isURI('xxx!')).toBe(false);
        expect(isURI('http://我爱中国.com')).toBe(false);
    });
});
