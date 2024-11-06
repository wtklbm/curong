import { inChinese } from '..';

describe('@curong/regexp/inChinese', () => {
    test('测试1', () => {
        expect(inChinese('我爱中国！')).toBe(true);
        expect(inChinese('我爱中国！')).toBe(true);
        expect(inChinese('xxx!')).toBe(false);
        expect(inChinese('我爱中国')).toBe(true);
    });
});
