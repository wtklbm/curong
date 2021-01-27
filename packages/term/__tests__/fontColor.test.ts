import { fontColor } from '../src';

describe('@curong/term/colorNameCode24bit', () => {
    test('测试1', () => {
        expect(fontColor('Test')).toBe('\u001B[0mTest');
    });

    test('测试2', () => {
        let text = fontColor('', {
            foreground: 'red',
            background: 'yellow'
        });

        expect(text).toBe('');
    });

    test('测试3', () => {
        let text = fontColor('正在加载进度条...', {
            foreground: 'red',
            background: 'yellow'
        });

        expect(text).toBe(
            '\u001B[38;5;1;48;5;3m正在加载进度条...\u001B[39;49m'
        );
        console.log(text, '完成了！');

        text = fontColor('正在加载进度条...', {
            foreground: 'red',
            background: 'yellow',
            underlined: true
        });

        expect(text).toBe(
            '\u001B[38;5;1;48;5;3;4m正在加载进度条...\u001B[39;49;24m'
        );

        text = fontColor('正在加载进度条...', {
            foreground: 'red',
            background: 'yellow',
            underlined: true,
            bold: true
        });

        expect(text).toBe(
            '\u001B[38;5;1;48;5;3;1;4m正在加载进度条...\u001B[39;49;22;24m'
        );
    });
});
