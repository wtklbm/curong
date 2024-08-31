import { unifiedSeparator } from '../src';

describe('@curong/path/unifiedSeparator', () => {
    test('测试1', () => {
        expect(unifiedSeparator('')).toBe('');
        expect(unifiedSeparator('\\\\\?\\c:\\windows')).toBe('\\\\\?\\c:\\windows');
    });

    test('测试2', () => {
        expect(unifiedSeparator('C:\\Video\\js.mp4')).toBe('C:/Video/js.mp4');
        expect(unifiedSeparator('/Video/js.mp4')).toBe('/Video/js.mp4');
        expect(unifiedSeparator('C:\\Video/js.mp4')).toBe('C:/Video/js.mp4');
        expect(unifiedSeparator('/Video\\js.mp4')).toBe('/Video/js.mp4');
    });
});
