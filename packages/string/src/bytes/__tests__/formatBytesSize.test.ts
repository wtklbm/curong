import { formatBytesSize } from '..';

describe('@curong/string/formatBytesSize', () => {
    test('输入为小于 1000 (SI) 或 1024 (IEC) 的字节数时返回 "B" 单位', () => {
        expect(formatBytesSize(999)).toBe('999 B');
        expect(formatBytesSize(1023, false)).toBe('1023 B');
    });

    test('输入为 0 时返回 "0 B"', () => {
        expect(formatBytesSize(0)).toBe('0 B');
    });

    test('输入为负数时的处理', () => {
        expect(formatBytesSize(-1000)).toBe('-1.0 KB');
        expect(formatBytesSize(-1024, false)).toBe('-1.0 KiB');
    });

    test('处理标准 SI 单位', () => {
        expect(formatBytesSize(1000)).toBe('1.0 KB');
        expect(formatBytesSize(1000000)).toBe('1.0 MB');
        expect(formatBytesSize(1500000, true, 2)).toBe('1.50 MB');
    });

    test('处理 IEC 单位 (1024 为基数)', () => {
        expect(formatBytesSize(1024, false)).toBe('1.0 KiB');
        expect(formatBytesSize(1048576, false)).toBe('1.0 MiB');
        expect(formatBytesSize(1572864, false, 2)).toBe('1.50 MiB');
    });

    test('处理非常大的字节数', () => {
        expect(formatBytesSize(10 ** 15)).toBe('1.0 PB');
        expect(formatBytesSize(2 ** 50, false)).toBe('1.0 PiB');
    });

    test('处理不同的小数位数', () => {
        expect(formatBytesSize(123456789)).toBe('123.5 MB');
        expect(formatBytesSize(123456789, true, 3)).toBe('123.457 MB');
        expect(formatBytesSize(123456789, false, 0)).toBe('118 MiB');
        expect(formatBytesSize(123456789, false, 1)).toBe('117.7 MiB');
        expect(formatBytesSize(123456789, false, 2)).toBe('117.74 MiB');
    });

    test('随机测试', () => {
        expect(formatBytesSize(0)).toBe('0 B');
        expect(formatBytesSize(4)).toBe('4 B');
        expect(formatBytesSize(10)).toBe('10 B');
        expect(formatBytesSize(10.1)).toBe('10.1 B');
        expect(formatBytesSize(999)).toBe('999 B');
        expect(formatBytesSize(1001, false)).toBe('1001 B');
        expect(formatBytesSize(1024)).toBe('1.0 KB');
        expect(formatBytesSize(1025)).toBe('1.0 KB');
        expect(formatBytesSize(2411724.8, false)).toBe('2.3 MiB');
        expect(formatBytesSize(1e16, false, 2)).toBe('8.88 PiB');
        expect(formatBytesSize(1e30, false, 2)).toBe('827180.61 YiB');
    });
});
