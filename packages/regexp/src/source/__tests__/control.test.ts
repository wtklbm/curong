import { control } from '..';

describe('@curong/regexp/control', () => {
    const controlRegex = new RegExp(control);

    test('should match valid control characters', () => {
        // 测试有效的控制字符
        const validControlCharacters = [
            '\u0000', // Null character
            '\u0001', // Start of Heading
            '\u0002', // Start of Text
            '\u0003', // End of Text
            '\u0004', // End of Transmission
            '\u0005', // Enquiry
            '\u0006', // Acknowledge
            '\u0007', // Bell
            '\u0008', // Backspace
            '\u000C', // Form Feed
            '\u000E', // Shift Out
            '\u000F', // Shift In
            '\u001B', // Escape
            '\u007F', // Delete
            '\u202E', // Right-to-left embedding
            '\u200B', // Zero-width space
            '\u206A', // Inhibit Symmetric Swapping
            '\u206B' // Activate Symmetric Swapping
        ];

        validControlCharacters.forEach(char => {
            expect(controlRegex.test(char)).toBe(true);
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
            'あ', // 平假名
            'ア', // 片假名
            '中', // 汉字
            'Hello' // 字符串
        ];

        invalidCharacters.forEach(char => {
            expect(controlRegex.test(char)).toBe(false);
        });
    });

    test('should match strings with control characters', () => {
        // 测试包含控制字符的混合字符串
        const mixedStrings = [
            'Hello\u0000World', // 包含控制字符
            'Testing\u0001', // 仅控制字符
            '\u0002A', // 以控制字符开头
            'B\u0003C', // 控制字符在中间
            'D\u0004' // 控制字符在结尾
        ];

        mixedStrings.forEach(str => {
            expect(controlRegex.test(str)).toBe(true);
        });
    });

    test('should not match strings with no control characters', () => {
        // 测试没有控制字符的字符串
        const noControlStrings = [
            'Hello World', // 仅拉丁字母
            '123456', // 仅数字
            'アリガトウ', // 仅片假名
            '😊😊😊', // 仅表情符号
            ' ', // 仅空格
            '!!!' // 仅标点
        ];

        noControlStrings.forEach(str => {
            expect(controlRegex.test(str)).toBe(false);
        });
    });

    test('should match edge cases', () => {
        expect(controlRegex.test('')).toBe(false); // 空字符串
    });
});
