// @ts-nocheck
import { inChkPunctuation } from '../src';

describe('@curong/regexp/inChkPunctuation', () => {
    test('测试1', () => {
        expect(inChkPunctuation).toThrowError();
    });

    test('测试2', () => {
        expect(() => inChkPunctuation(123)).toThrowError();
    });

    test('测试3', () => {
        expect(inChkPunctuation('我爱中国！')).toBe(true);
        expect(inChkPunctuation('xxx!')).toBe(false);
        expect(inChkPunctuation('我爱中国')).toBe(false);
    });
});
