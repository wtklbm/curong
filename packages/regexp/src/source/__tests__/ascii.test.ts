import { ascii } from '..';

describe('@curong/regexp/ascii', () => {
    const regex = new RegExp(ascii);

    test('粗略测试', () => {
        const s: string[] = ['\u0000', '\u007F'];
        expect(s.every(v => regex.test(v))).toBe(true);
    });

    test('匹配范围 \\u0000 的起始字符', () => {
        expect(regex.test('\u0000')).toBe(true);
    });

    test('匹配范围 \\u007F 的结束字符', () => {
        expect(regex.test('\u007F')).toBe(true);
    });

    test('匹配范围内的字符 \\u0041', () => {
        expect(regex.test('\u0041')).toBe(true); // '\u0041' 是 'A'
    });

    test('不匹配范围外的字符 \\u0080', () => {
        expect(regex.test('\u0080')).toBe(false);
    });
});
