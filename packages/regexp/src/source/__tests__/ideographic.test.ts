import { ideographic } from '..';

describe('@curong/regexp/ideographic', () => {
    const ideographicRegex = new RegExp(ideographic);

    test('should match valid ideographic characters', () => {
        // 测试有效的表意文字（汉字）
        const validIdeographs = [
            '汉', // 汉字
            '字', // 汉字
            '你', // 汉字
            '好', // 汉字
            '我', // 汉字
            '爱', // 汉字
            '学', // 汉字
            '中文', // 组合汉字
            '学习', // 组合汉字
            '测试' // 组合汉字
        ];

        validIdeographs.forEach(char => {
            expect(ideographicRegex.test(char)).toBe(true);
        });
    });

    test('should not match invalid characters', () => {
        // 测试无效的字符
        const invalidCharacters = [
            'A', // 拉丁字母
            '1', // 数字
            ' ', // 空格
            'ア', // 片假名
            '😊', // 表情符
            '\u200B', // 零宽空格
            '!', // 感叹号
            '@', // ＠符
            '가' // 韩文字符
        ];

        invalidCharacters.forEach(char => {
            expect(ideographicRegex.test(char)).toBe(false);
        });
    });

    test('should match strings with mixed characters', () => {
        // 测试包含表意文字的混合字符串
        const mixedStrings = [
            'Hello 汉字', // 包含汉字
            '你好', // 仅汉字
            'A 你 B', // 包含汉字
            'This is a 测试' // 包含汉字
        ];

        mixedStrings.forEach(str => {
            expect(ideographicRegex.test(str)).toBe(true);
        });
    });

    test('should not match strings with no ideographic characters', () => {
        // 测试没有表意文字的字符串
        const noIdeographicStrings = [
            'Hello World', // 仅拉丁字母
            '123456', // 仅数字
            'アリガトウ', // 仅片假名
            '😊😊😊', // 仅表情符号
            ' ', // 仅空格
            '!!!' // 仅标点
        ];

        noIdeographicStrings.forEach(str => {
            expect(ideographicRegex.test(str)).toBe(false);
        });
    });

    test('should match edge cases', () => {
        expect(ideographicRegex.test('')).toBe(false); // 空字符串
        expect(ideographicRegex.test('\n')).toBe(false); // 换行符
        expect(ideographicRegex.test('\t')).toBe(false); // 制表符
    });
});
