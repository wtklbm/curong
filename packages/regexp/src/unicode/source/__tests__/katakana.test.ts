import { katakana } from '..';

describe('@curong/regexp/katakana', () => {
    const katakanaRegex = new RegExp(katakana);

    test('should match valid Katakana characters', () => {
        // 测试有效的片假名字符
        const validKatakana = [
            'ア', // 片假名字符
            'イ', // 片假名字符
            'ウ', // 片假名字符
            'エ', // 片假名字符
            'オ', // 片假名字符
            'カ', // 片假名字符
            'キ', // 片假名字符
            'ク', // 片假名字符
            'ケ', // 片假名字符
            'コ', // 片假名字符
            'サ', // 片假名字符
            'タ', // 片假名字符
            'ナ', // 片假名字符
            'ハ', // 片假名字符
            'マ', // 片假名字符
            'ヤ', // 片假名字符
            'ラ', // 片假名字符
            'ワ', // 片假名字符
            'ン', // 片假名字符
            'バ', // 浊音
            'パ', // 清音
            'ヴ' // 半浊音
        ];

        validKatakana.forEach(char => {
            expect(katakanaRegex.test(char)).toBe(true);
        });
    });

    test('should not match invalid characters', () => {
        // 测试无效的字符
        const invalidCharacters = [
            'A', // 拉丁字母
            '1', // 数字
            ' ', // 空格
            '漢', // 汉字
            '😊', // 表情符
            '\u200B', // 零宽空格
            '!', // 感叹号
            '@', // ＠符
            '가' // 韩文字符
        ];

        invalidCharacters.forEach(char => {
            expect(katakanaRegex.test(char)).toBe(false);
        });
    });

    test('should match strings with mixed characters', () => {
        // 测试包含片假名字符的混合字符串
        const mixedStrings = [
            'Hello アリ', // 包含片假名字符
            'イナズマ', // 仅片假名
            'A カ B', // 包含片假名字符
            'This is a テスト' // 包含片假名字符
        ];

        mixedStrings.forEach(str => {
            expect(katakanaRegex.test(str)).toBe(true);
        });
    });

    test('should not match strings with no Katakana characters', () => {
        // 测试没有片假名字符的字符串
        const noKatakanaStrings = [
            'Hello World', // 仅拉丁字母
            '123456', // 仅数字
            '😊😊😊', // 仅表情符号
            ' ', // 仅空格
            '!!!' // 仅标点
        ];

        noKatakanaStrings.forEach(str => {
            expect(katakanaRegex.test(str)).toBe(false);
        });
    });

    test('should match edge cases', () => {
        expect(katakanaRegex.test('')).toBe(false); // 空字符串
        expect(katakanaRegex.test('\n')).toBe(false); // 换行符
        expect(katakanaRegex.test('\t')).toBe(false); // 制表符
    });
});
