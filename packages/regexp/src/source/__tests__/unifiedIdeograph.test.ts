import { unifiedIdeograph } from '..';

describe('@curong/regexp/unifiedIdeograph', () => {
    // 定义正则表达式
    const unifiedIdeographRegex = new RegExp(unifiedIdeograph);

    test('should match valid unified ideographs', () => {
        // 测试有效的统一汉字
        const validIdeographs = [
            '汉', // 汉字
            '字', // 字
            '你', // 你
            '好', // 好
            '测试', // 测试
            '中文', // 中文
            '世界', // 世界
            '𠀀' // 汉字补充字符（CJK Unified Ideograph Extension B）
        ];

        validIdeographs.forEach(char => {
            expect(unifiedIdeographRegex.test(char)).toBe(true);
        });
    });

    test('should not match invalid characters', () => {
        // 测试无效的字符
        const invalidCharacters = [
            'A', // 拉丁字母
            '1', // 数字
            '!', // 标点符号
            ' ', // 空格
            '\u200B', // 零宽空格
            '©', // 版权符号
            '😊', // 表情符号
            '𐍈' // 哥特字母
        ];

        invalidCharacters.forEach(char => {
            expect(unifiedIdeographRegex.test(char)).toBe(false);
        });
    });

    test('should match strings with mixed characters', () => {
        // 测试包含汉字的混合字符串
        const mixedStrings = [
            'Hello 汉字', // 包含汉字
            '你好 World', // 包含汉字
            '123 测试', // 包含汉字
            '© 中文!', // 包含汉字
            '😊 世界', // 包含汉字
            'This is a 测试 string', // 包含汉字
            'A汉B字C' // 包含汉字
        ];

        mixedStrings.forEach(str => {
            expect(unifiedIdeographRegex.test(str)).toBe(true);
        });
    });

    test('should match multiple unified ideographs in a string', () => {
        // 测试包含多个汉字的字符串
        const multiIdeographStrings = [
            '汉字测试', // 多个汉字
            '你好，世界', // 多个汉字
            '我爱中国', // 多个汉字
            '中文测试汉字' // 多个汉字
        ];

        multiIdeographStrings.forEach(str => {
            expect(unifiedIdeographRegex.test(str)).toBe(true);
        });
    });

    test('should not match strings with no unified ideographs', () => {
        // 测试没有汉字的字符串
        const noIdeographStrings = [
            'Hello World', // 仅拉丁字母
            '123456', // 仅数字
            '!', // 仅标点符号
            ' ', // 仅空格
            '©©©' // 仅版权符号
        ];

        noIdeographStrings.forEach(str => {
            expect(unifiedIdeographRegex.test(str)).toBe(false);
        });
    });

    test('should match edge cases', () => {
        expect(unifiedIdeographRegex.test('')).toBe(false); // 空字符串
        expect(unifiedIdeographRegex.test('\n')).toBe(false); // 换行符
        expect(unifiedIdeographRegex.test('\u3000')).toBe(false); // 全角空格
        expect(unifiedIdeographRegex.test('𠀀')).toBe(true); // 边缘汉字
        expect(unifiedIdeographRegex.test('𡈽')).toBe(true); // 边缘汉字
    });
});
