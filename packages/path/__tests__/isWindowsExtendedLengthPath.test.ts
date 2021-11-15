import { isWindowsExtendedLengthPath } from '../src';

describe('@curong/path/isWindowsExtendedLengthPath', () => {
    test('测试1', () => {
        expect(isWindowsExtendedLengthPath('/__test__/fsd')).toBe(false);
        expect(isWindowsExtendedLengthPath('./test/xxx')).toBe(false);
        expect(isWindowsExtendedLengthPath('../test/xxx')).toBe(false);
        expect(isWindowsExtendedLengthPath('../../test/xxx')).toBe(false);
        expect(isWindowsExtendedLengthPath('\\x')).toBe(false);
        expect(isWindowsExtendedLengthPath('c:\\x')).toBe(false);
        expect(isWindowsExtendedLengthPath('c:\\\\x')).toBe(false);
        expect(isWindowsExtendedLengthPath('abc:\\\\x')).toBe(false);
    });

    test('测试2', () => {
        expect(
            isWindowsExtendedLengthPath('\\\\?\\c:\\d.x.fds\\x\\COM1x\\xx')
        ).toBe(true);
    });
});
