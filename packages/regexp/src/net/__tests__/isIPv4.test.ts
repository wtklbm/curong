import { isIPv4 } from '..';

describe('@curong/regexp/isIPv4', () => {
    test('测试1', () => {
        expect(isIPv4('')).toBe(false);
        expect(isIPv4('2409:8054:48::1006')).toBe(false);
        expect(isIPv4('127.0.0.1:8080')).toBe(false);
        expect(isIPv4('192.168.4.50:3000')).toBe(false);
        expect(isIPv4('10.0.0.0/8')).toBe(false);
        expect(isIPv4('127.0.0.1:80')).toBe(false);
        expect(isIPv4('0.0.0.0:80')).toBe(false);
    });

    test('测试2', () => {
        expect(isIPv4('196.223.149.8')).toBe(true);
        expect(isIPv4('196.223.149.8')).toBe(true);

        expect(isIPv4('127.0.0.1')).toBe(true);
        expect(isIPv4('192.168.4.50')).toBe(true);
        expect(isIPv4('10.0.0.0')).toBe(true);
        expect(isIPv4('127.0.0.1')).toBe(true);
        expect(isIPv4('0.0.0.0')).toBe(true);
    });
});

