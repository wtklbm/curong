import { parseBytesSize } from '..';

describe('@curong/string/parseBytesSize', () => {
    test('测试1', () => {
        expect(() => parseBytesSize('invalid input')).toThrow();
        expect(() => parseBytesSize('1000')).toThrow();
        expect(() => parseBytesSize('1.5')).toThrow();
        expect(() => parseBytesSize('1.5 GB extra')).toThrow();
        expect(() => parseBytesSize('1.5 unknown')).toThrow();
    });

    test('测试2', () => {
        expect(parseBytesSize('0 B')).toBe(0);
        expect(parseBytesSize('20.25 B')).toBe(20.25);
        expect(parseBytesSize('1000 B')).toBe(1000);
        expect(parseBytesSize('3000 B')).toBe(3000);

        expect(parseBytesSize('10 MB')).toBe(10000000);
        expect(parseBytesSize('500 KB')).toBe(500000);
        expect(parseBytesSize('1 GB')).toBe(1000000000);
        expect(parseBytesSize('2 TB')).toBe(2000000000000);

        expect(parseBytesSize('1 MiB')).toBe(1048576);
        expect(parseBytesSize('500 KiB')).toBe(512000);
        expect(parseBytesSize('1 GiB')).toBe(1073741824);
        expect(parseBytesSize('2 TiB')).toBe(2199023255552);

        expect(parseBytesSize('1.5 GB')).toBe(1500000000);
        expect(parseBytesSize('2.5 MiB')).toBe(2621440);
        expect(parseBytesSize('0.5 TB')).toBe(500000000000);
        expect(parseBytesSize('0.1 GiB')).toBe(107374182.4);

        expect(parseBytesSize('10 mib')).toBe(10485760);
        expect(parseBytesSize('500 kib')).toBe(512000);
        expect(parseBytesSize('1 gib')).toBe(1073741824);
        expect(parseBytesSize('2 tib')).toBe(2199023255552);
    });

    test('测试3', () => {
        expect(parseBytesSize(0, 'B')).toBe(0);
        expect(parseBytesSize(20.25, 'B')).toBe(20.25);
        expect(parseBytesSize(1000, 'B')).toBe(1000);
        expect(parseBytesSize(3000, 'B')).toBe(3000);

        expect(parseBytesSize(10, 'MB')).toBe(10000000);
        expect(parseBytesSize(500, 'KB')).toBe(500000);
        expect(parseBytesSize(1, 'GB')).toBe(1000000000);
        expect(parseBytesSize(2, 'TB')).toBe(2000000000000);

        expect(parseBytesSize(1, 'MiB')).toBe(1048576);
        expect(parseBytesSize(500, 'KiB')).toBe(512000);
        expect(parseBytesSize(1, 'GiB')).toBe(1073741824);
        expect(parseBytesSize(2, 'TiB')).toBe(2199023255552);

        expect(parseBytesSize(1.5, 'GB')).toBe(1500000000);
        expect(parseBytesSize(2.5, 'MiB')).toBe(2621440);
        expect(parseBytesSize(0.5, 'TB')).toBe(500000000000);
        expect(parseBytesSize(0.1, 'GiB')).toBe(107374182.4);

        expect(parseBytesSize(10, 'MiB')).toBe(10485760);
        expect(parseBytesSize(500, 'KiB')).toBe(512000);
        expect(parseBytesSize(1, 'GiB')).toBe(1073741824);
        expect(parseBytesSize(2, 'TiB')).toBe(2199023255552);
    });

    test('测试4', () => {
        expect(parseBytesSize('1024B')).toBe(1024);
        expect(parseBytesSize(2048, 'B')).toBe(2048);

        expect(parseBytesSize('1KiB')).toBe(1024);
        expect(parseBytesSize(1, 'KiB')).toBe(1024);
        expect(parseBytesSize(2, 'KiB')).toBe(2048);

        expect(parseBytesSize('1MiB')).toBe(1048576);
        expect(parseBytesSize(1, 'MiB')).toBe(1048576);
        expect(parseBytesSize(1024, 'KiB')).toBe(1048576);

        expect(parseBytesSize('1GiB')).toBe(1073741824);
        expect(parseBytesSize(1, 'GiB')).toBe(1073741824);
        expect(parseBytesSize('1024MiB')).toBe(1073741824);

        expect(parseBytesSize('1TiB')).toBe(1099511627776);
        expect(parseBytesSize(1, 'TiB')).toBe(1099511627776);
        expect(parseBytesSize('1024GiB')).toBe(1099511627776);

        expect(parseBytesSize('1PiB')).toBe(1125899906842624);
        expect(parseBytesSize(1, 'PiB')).toBe(1125899906842624);
        expect(parseBytesSize('1024TiB')).toBe(1125899906842624);
    });
});
