import { korean } from '..';

describe('@curong/regexp/korean', () => {
    const hangulRegex = new RegExp(korean);

    test('should match valid Hangul characters', () => {
        // 测试有效的韩文字符
        const validHangul = [
            '가', // 韩文字符
            '한', // 韩文字符
            '글', // 韩文字符
            '안', // 韩文字符
            '녕', // 韩文字符
            '하', // 韩文字符
            '세요', // 韩文字符（组合）
            '여', // 韩文字符
            '행', // 韩文字符
            '이', // 韩文字符
            '돋' // 韩文字符
        ];

        validHangul.forEach(char => {
            expect(hangulRegex.test(char)).toBe(true);
        });
    });

    test('should not match invalid characters', () => {
        // 测试无效的字符
        const invalidCharacters = [
            'A', // 拉丁字母
            '1', // 数字
            ' ', // 空格
            '汉', // 汉字
            '😊', // 表情符
            '\u200B', // 零宽空格
            '!', // 感叹号
            '@' // ＠符
        ];

        invalidCharacters.forEach(char => {
            expect(hangulRegex.test(char)).toBe(false);
        });
    });

    test('should match strings with mixed characters', () => {
        // 测试包含韩文字符的混合字符串
        const mixedStrings = [
            'Hello 가세요', // 包含韩文字符
            '안녕하세요', // 仅韩文
            'A 가 B', // 包含韩文字符
            'This is a 테스트' // 包含韩文字符
        ];

        mixedStrings.forEach(str => {
            expect(hangulRegex.test(str)).toBe(true);
        });
    });

    test('should not match strings with no Hangul characters', () => {
        // 测试没有韩文字符的字符串
        const noHangulStrings = [
            'Hello World', // 仅拉丁字母
            '123456', // 仅数字
            '汉字测试', // 仅汉字
            '😊😊😊', // 仅表情符号
            ' ', // 仅空格
            '!!!' // 仅标点
        ];

        noHangulStrings.forEach(str => {
            expect(hangulRegex.test(str)).toBe(false);
        });
    });

    test('should match edge cases', () => {
        expect(hangulRegex.test('')).toBe(false); // 空字符串
        expect(hangulRegex.test('\n')).toBe(false); // 换行符
        expect(hangulRegex.test('\t')).toBe(false); // 制表符
    });
});
