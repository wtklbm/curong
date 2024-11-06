import { han } from '..';

describe('@curong/regexp/han', () => {
    const hanRegex = new RegExp(han);

    test('matches single characters', () => {
        expect(hanRegex.test('\u00B7')).toBe(true); // Testing \xB7
        expect(hanRegex.test('\u2E80')).toBe(true); // Start of \u2E80-\u2E99
        expect(hanRegex.test('\u2E99')).toBe(true); // End of \u2E80-\u2E99
        expect(hanRegex.test('\u3001')).toBe(true); // Start of \u3001-\u3003
        expect(hanRegex.test('\u3003')).toBe(true); // End of \u3001-\u3003
    });

    test('matches surrogate pairs', () => {
        expect(hanRegex.test('\uD81B\uDFE2')).toBe(true); // Testing \uD81B\uDFE2
        expect(hanRegex.test('\uD81B\uDFF1')).toBe(true); // Testing \uD81B\uDFF1
        expect(hanRegex.test('\uD834\uDF60')).toBe(true); // Start of \uD834\uDF60-\uDF71
        expect(hanRegex.test('\uD834\uDF71')).toBe(true); // End of \uD834\uDF60-\uDF71
    });

    test('should match single characters', () => {
        expect(hanRegex.test('\u00B7')).toBe(true);
        expect(hanRegex.test('\u30FB')).toBe(true);
        expect(hanRegex.test('\uFE45')).toBe(true);
        expect(hanRegex.test('\uFE46')).toBe(true);
    });

    test('should match range start and end characters', () => {
        expect(hanRegex.test('\u2E80')).toBe(true); // Range \u2E80-\u2E99 start
        expect(hanRegex.test('\u2E99')).toBe(true); // Range \u2E80-\u2E99 end

        expect(hanRegex.test('\u2E9B')).toBe(true); // Range \u2E9B-\u2EF3 start
        expect(hanRegex.test('\u2EF3')).toBe(true); // Range \u2E9B-\u2EF3 end

        expect(hanRegex.test('\u4E00')).toBe(true); // Range \u4E00-\u9FFF start
        expect(hanRegex.test('\u9FFF')).toBe(true); // Range \u4E00-\u9FFF end
    });

    test('should match surrogate pair ranges', () => {
        expect(hanRegex.test('\uD81B\uDFE2')).toBe(true); // U+D81B U+DFE2
        expect(hanRegex.test('\uD81B\uDFF1')).toBe(true); // U+D81B U+DFF1

        expect(hanRegex.test('\uD834\uDF60')).toBe(true); // U+D834 U+DF60
        expect(hanRegex.test('\uD834\uDF71')).toBe(true); // U+D834 U+DF71
    });

    test('should match valid Han characters', () => {
        // 测试有效的汉字字符
        const validHanCharacters = [
            '汉', // 汉字
            '字', // 汉字
            '你', // 汉字
            '好', // 汉字
            '我', // 汉字
            '爱', // 汉字
            '学', // 汉字
            '中文', // 组合汉字
            '学习', // 组合汉字
            '测试', // 组合汉字
            '汉字', // 组合汉字
            '的', // 汉字
            '是', // 汉字
            '在', // 汉字
            '了' // 汉字
        ];

        validHanCharacters.forEach(char => {
            expect(hanRegex.test(char)).toBe(true);
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
            '가', // 韩文字符
            'い', // 平假名
            'م' // 阿拉伯字母
        ];

        invalidCharacters.forEach(char => {
            expect(hanRegex.test(char)).toBe(false);
        });
    });

    test('should match strings with mixed characters', () => {
        // 测试包含汉字字符的混合字符串
        const mixedStrings = [
            'Hello 汉字', // 包含汉字
            '你好吗', // 仅汉字
            'A 汉字 B', // 包含汉字字符
            'This is a 测试' // 包含汉字字符
        ];

        mixedStrings.forEach(str => {
            expect(hanRegex.test(str)).toBe(true);
        });
    });

    test('should not match strings with no Han characters', () => {
        // 测试没有汉字字符的字符串
        const noHanStrings = [
            'Hello World', // 仅拉丁字母
            '123456', // 仅数字
            'アリガトウ', // 仅片假名
            '😊😊😊', // 仅表情符号
            ' ', // 仅空格
            '!!!' // 仅标点
        ];

        noHanStrings.forEach(str => {
            expect(hanRegex.test(str)).toBe(false);
        });
    });

    test('should match edge cases', () => {
        expect(hanRegex.test('')).toBe(false); // 空字符串
        expect(hanRegex.test('\n')).toBe(false); // 换行符
        expect(hanRegex.test('\t')).toBe(false); // 制表符
    });
});
