import { inChkPunctuation } from '../src';

describe('@curong/regexp/inChkPunctuation', () => {
    test('测试1', () => {
        expect(inChkPunctuation('我爱中国！')).toBe(true);
        expect(inChkPunctuation('xxx!')).toBe(false);
        expect(inChkPunctuation('我爱中国')).toBe(false);
    });
});
