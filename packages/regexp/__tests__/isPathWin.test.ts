import { isWindowsPath } from '../src';

describe('@curong/regexp/source/pathWin', () => {
    test('测试1', () => {
        expect(isWindowsPath('/__test__/fsd')).toBe(false);
        expect(isWindowsPath('/test/xxx')).toBe(false);
        expect(isWindowsPath('c:\\x')).toBe(true);
        expect(isWindowsPath('\\\\?\\c:\\d.x.fds\\x\\COM1x\\xx')).toBe(true);
        expect(isWindowsPath('c:\\\\x', true)).toBe(false);
        expect(isWindowsPath('abcc:\\\\x', true)).toBe(false);
        expect(isWindowsPath('c:\\\\d.x.fds\\x\\xxCOM0/sdf/x/f\\sd/f')).toBe(
            false
        );
        expect(isWindowsPath('c:\\d.x.fds\\x\\xxCOM0/sdf/x/f\\sd/f')).toBe(
            false
        );
        expect(isWindowsPath('..\\xxx\\xxx\\xxx xxx中国')).toBe(true);
        expect(isWindowsPath('/xxx/xxx/xx')).toBe(false);
    });

    test('测试2', () => {
        expect(isWindowsPath('..\\ ')).toBe(false);
        expect(isWindowsPath('.\\.')).toBe(false);
        expect(isWindowsPath('.\\\\.')).toBe(false);
        expect(isWindowsPath('..\\.')).toBe(false);
        expect(isWindowsPath('.\\x')).toBe(true);
        expect(isWindowsPath('..\\x')).toBe(true);
    });

    test('测试3', () => {
        expect(isWindowsPath('./')).toBe(false);
        expect(isWindowsPath('../')).toBe(false);
        expect(isWindowsPath('..\\')).toBe(true);
        expect(isWindowsPath('.\\')).toBe(true);
        expect(isWindowsPath('.\\ ')).toBe(false);
    });

    test('测试4', () => {
        expect(isWindowsPath('./xxx/xxx/xx')).toBe(false);
        expect(isWindowsPath('c:\\..\\..\\')).toBe(true);
        expect(isWindowsPath('c:\\\\\\\\\\')).toBe(false);
        expect(isWindowsPath('c:\\.\\.\\')).toBe(false);
        expect(isWindowsPath('.\\.\\.\\')).toBe(false);
    });

    test('测试5', () => {
        expect(isWindowsPath('..\\..\\..\\')).toBe(true);
        expect(isWindowsPath('c:\\d.x.fds\\x\\COM0\\.')).toBe(false);
        expect(isWindowsPath('c:\\dx fds\\x\\COM1')).toBe(false);
        expect(isWindowsPath('c:\\dx fds\\x\\COM1\\')).toBe(false);
        expect(isWindowsPath('c:\\dx fds\\x\\COM1\\xx')).toBe(false);
        expect(isWindowsPath('c:\\dx fds\\x\\COM1\\xx\\xx')).toBe(false);
        expect(isWindowsPath('c:\\dx fds\\x\\COM1\\xx\\')).toBe(false);
        expect(isWindowsPath('c:\\dx fds\\x\\COM1\\xx\\xx\\')).toBe(false);
    });

    test('测试6', () => {
        expect(isWindowsPath('\\\\?\\c:\\\\x')).toBe(false);
        expect(isWindowsPath('\\\\?\\c:\\x')).toBe(true);
        expect(isWindowsPath('\\\\?\\..\\x xxx\\x xx\\ xxx')).toBe(false);
        expect(isWindowsPath('\\\\?\\..\\xxxx\\xxx\\xxx ')).toBe(false);
        expect(
            isWindowsPath('\\\\?\\c:\\\\d.x.fds\\x\\xxCOM0/sdf/x/f\\sd/f')
        ).toBe(false);
    });

    test('测试7', () => {
        expect(isWindowsPath('c:\\COM1')).toBe(false);
        expect(isWindowsPath('c:\\COM0')).toBe(true);
        expect(isWindowsPath('c:\\CON\\')).toBe(false);
    });
});
