import { ascii } from '..';

describe('@curong/regexp/ascii', () => {
    const regex = new RegExp(ascii);

    test('粗略测试', () => {
        const ok: string[] = [
            '\u0000',
            '\u007F',
            'foobar',
            '0987654321',
            'test@example.com',
            '1234abcDEF'
        ];
        expect(ok.every(v => regex.test(v))).toBe(true);

        const err = ['ｆｏｏBar', 'ｘｙｚ０９８', '１２３456', 'ｶﾀｶﾅ'];
        expect(err.every(v => regex.test(v))).toBe(false);
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
