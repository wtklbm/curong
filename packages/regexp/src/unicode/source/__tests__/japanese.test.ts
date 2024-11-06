import { japanese } from '..';

describe('@curong/regexp/japanese', () => {
    const combinedRegex = new RegExp(japanese);

    test('测试1', () => {
        const s: string[] = [
            '\u3000Ａｚ０９ぁんァン一龠々谢ひらがなコン',
            'ァン一ｧﾝﾞﾟ一コン一ｺｻｼｽｾｿﾀ一'
        ];
        expect(
            s.every(v => v.split('').every(c => combinedRegex.test(c)))
        ).toBe(true);
    });

    test('测试2', () => {
        // 测试有效的汉字、平假名、片假名和全角字符
        const validCharacters = [
            '汉', // 汉字
            '字', // 汉字
            'あ', // 平假名
            'い', // 平假名
            'ア', // 片假名
            'イ', // 片假名
            'こんにちは', // 平假名组合
            'ありがとう', // 平假名组合
            'テスト', // 片假名组合
            '漢字', // 汉字组合
            '\u3000', // 全角空格
            '\uFF01', // 全角感叹号
            '\uFF5E', // 全角波浪号
            '\uFF10', // 全角数字 0
            '\uFF20' // 全角 @
        ];

        validCharacters.forEach(char => {
            expect(combinedRegex.test(char)).toBe(true);
        });
    });

    test('测试3', () => {
        // 测试无效的字符
        const invalidCharacters = [
            'A', // 拉丁字母
            '1', // 数字
            ' ', // 空格
            '😊', // 表情符
            '가', // 韩文字符
            'A', // 拉丁字母
            '!', // 感叹号
            '@', // ＠符
        ];

        invalidCharacters.forEach(char => {
            expect(combinedRegex.test(char)).toBe(false);
        });
    });

    test('测试4', () => {
        // 测试包含汉字、平假名、片假名和全角字符的混合字符串
        const mixedStrings = [
            'Hello 漢字', // 包含汉字
            'こんにちは', // 仅平假名
            'テスト', // 仅片假名
            'A 漢字 B', // 包含汉字字符
            'This is a テスト', // 包含片假名
            '　Hello', // 包含全角空格
            '\uFF01 Test', // 包含全角感叹号
            'こんにちは！' // 包含平假名和标点
        ];

        mixedStrings.forEach(str => {
            expect(combinedRegex.test(str)).toBe(true);
        });
    });

    test('测试5', () => {
        // 测试没有汉字、平假名、片假名和全角字符的字符串
        const noValidStrings = [
            'Hello World', // 仅拉丁字母
            '123456', // 仅数字
            '😊😊😊', // 仅表情符号
            ' ', // 仅空格
            '!!!' // 仅标点
        ];

        noValidStrings.forEach(str => {
            expect(combinedRegex.test(str)).toBe(false);
        });
    });

    test('测试6', () => {
        // 测试边界条件
        expect(combinedRegex.test('')).toBe(false); // 空字符串
        expect(combinedRegex.test('\n')).toBe(false); // 换行符
        expect(combinedRegex.test('\t')).toBe(false); // 制表符
    });
});
