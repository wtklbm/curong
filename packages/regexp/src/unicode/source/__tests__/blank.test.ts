import { blank } from '..';

describe('@curong/regexp/blank', () => {
    const regex = new RegExp(blank);

    test('粗略测试', () => {
        const s: string[] = [
            '\u0020',
            '\u1680',
            '\u2000',
            '\u200A',
            '\u2028',
            '\u2029',
            '\u202F',
            '\u205F',
            '\u3000'
        ];
        expect(s.every(v => regex.test(v))).toBe(true);
    });

    test('匹配单个字符 \\u0020 (空格)', () => {
        expect(regex.test('\u0020')).toBe(true);
    });

    test('匹配单个字符 \\xA0 (不换行空格)', () => {
        expect(regex.test('\xA0')).toBe(true);
    });

    test('匹配单个字符 \\u1680', () => {
        expect(regex.test('\u1680')).toBe(true);
    });

    test('匹配单个字符 \\u2028 (行分隔符)', () => {
        expect(regex.test('\u2028')).toBe(true);
    });

    test('匹配单个字符 \\u2029 (段落分隔符)', () => {
        expect(regex.test('\u2029')).toBe(true);
    });

    test('匹配单个字符 \\u202F (窄不换行空格)', () => {
        expect(regex.test('\u202F')).toBe(true);
    });

    test('匹配单个字符 \\u205F (数学空格)', () => {
        expect(regex.test('\u205F')).toBe(true);
    });

    test('匹配单个字符 \\u3000 (全角空格)', () => {
        expect(regex.test('\u3000')).toBe(true);
    });

    // 测试范围 \\u2000 - \\u200A
    test('匹配范围 \\u2000 的起始字符', () => {
        expect(regex.test('\u2000')).toBe(true);
        expect(regex.test('\u200A')).toBe(true);
    });

    // 测试范围内的一个中间字符
    test('匹配范围内的字符 \\u2005', () => {
        expect(regex.test('\u2005')).toBe(true); // '\u2005' 是四分之一空格
    });

    // 测试范围外的字符
    test('不匹配范围外的字符 \\u200B', () => {
        expect(regex.test('\u200B')).toBe(false);
    });
});
