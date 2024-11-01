import { hiragana } from '..';

describe('@curong/regexp/hiragana', () => {
    const hiraganaRegex = new RegExp(hiragana);

    test('should match valid Hiragana characters', () => {
        // 测试有效的平假名字符
        const validHiragana = [
            'あ', // 平假名字符
            'い', // 平假名字符
            'う', // 平假名字符
            'え', // 平假名字符
            'お', // 平假名字符
            'か', // 平假名字符
            'き', // 平假名字符
            'く', // 平假名字符
            'け', // 平假名字符
            'こ', // 平假名字符
            'さ', // 平假名字符
            'た', // 平假名字符
            'な', // 平假名字符
            'は', // 平假名字符
            'ま', // 平假名字符
            'や', // 平假名字符
            'ら', // 平假名字符
            'わ', // 平假名字符
            'ん', // 平假名字符
            'が', // 浊音
            'ざ', // 浊音
            'だ', // 浊音
            'ば', // 浊音
            'ぱ' // 清音
        ];

        validHiragana.forEach(char => {
            expect(hiraganaRegex.test(char)).toBe(true);
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
            'Testing 123', // 不包含平假名
            '@', // ＠符
            '가', // 韩文字符
            'ア' // 片假名
        ];

        invalidCharacters.forEach(char => {
            expect(hiraganaRegex.test(char)).toBe(false);
        });
    });

    test('should match strings with mixed characters', () => {
        // 测试包含平假名字符的混合字符串
        const mixedStrings = [
            'Hello こんにちは', // 包含平假名字符
            'ばあい', // 仅平假名
            'A ば B', // 包含平假名字符
            'This is a テスばト' // 包含平假名字符
        ];

        mixedStrings.forEach(str => {
            expect(hiraganaRegex.test(str)).toBe(true);
        });
    });

    test('should not match strings with no Hiragana characters', () => {
        // 测试没有平假名字符的字符串
        const noHiraganaStrings = [
            'Hello World', // 仅拉丁字母
            '123456', // 仅数字
            'アリガトウ', // 仅片假名
            '😊😊😊', // 仅表情符号
            ' ', // 仅空格
            '!!!' // 仅标点
        ];

        noHiraganaStrings.forEach(str => {
            expect(hiraganaRegex.test(str)).toBe(false);
        });
    });

    test('should match edge cases', () => {
        expect(hiraganaRegex.test('')).toBe(false); // 空字符串
        expect(hiraganaRegex.test('\n')).toBe(false); // 换行符
        expect(hiraganaRegex.test('\t')).toBe(false); // 制表符
    });
});
