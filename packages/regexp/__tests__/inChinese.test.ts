import { inChinese } from '../src';

describe('@curong/regexp/inChinese', () => {
    test('测试1', () => {
        expect(inChinese).toThrowError();
    });

    test('测试2', () => {
        expect(inChinese('我爱中国！')).toBe(true);
        expect(inChinese('我爱中国！')).toBe(true);
        expect(inChinese('xxx!')).toBe(false);
        expect(inChinese('我爱中国')).toBe(true);
    });
});
