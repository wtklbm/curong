import { isIP } from '..';

describe('@curong/regexp/isIP', () => {
    test('测试1', () => {
        expect(isIP('::')).toBe(true);
        expect(isIP('::1')).toBe(true);
        expect(isIP('2409:8054:48::1006')).toBe(true);
        expect(isIP('[240e:e0::abcd]:65560')).toBe(false);
        expect(isIP('[240e:e0::abcd]:655601')).toBe(false);
        expect(isIP('[240e:g0::abcd]:65530')).toBe(false);
    });

    test('测试2', () => {
        expect(isIP('127.0.0.1')).toBe(true);
        expect(isIP('10.0.0.1')).toBe(true);
        expect(isIP('192.168.0.1')).toBe(true);
    });

    test('测试3', () => {
        expect(isIP('0.0.0.0')).toBe(true);
        expect(isIP('255.255.255.255')).toBe(true);
        expect(isIP('1.2.3.4')).toBe(true);
        expect(isIP('2001:db8:0000:1:1:1:1:1')).toBe(true);
        expect(isIP('2001:41d0:2:a141::1')).toBe(true);
        expect(isIP('::ffff:127.0.0.1')).toBe(true);
        expect(isIP('::0000')).toBe(true);
        expect(isIP('0000::')).toBe(true);
        expect(isIP('1::')).toBe(true);
        expect(isIP('1111:1:1:1:1:1:1:1')).toBe(true);
        expect(isIP('fe80::a6db:30ff:fe98:e946')).toBe(true);
        expect(isIP('0:0:0:0:0:ffff:127.0.0.1')).toBe(false);
        expect(isIP('255.0.0.1')).toBe(true);
        expect(isIP('0.0.1.1')).toBe(true);

        expect(isIP('abc')).toBe(false);
        expect(isIP('256.0.0.0')).toBe(false);
        expect(isIP('0.0.0.256')).toBe(false);
        expect(isIP('26.0.0.256')).toBe(false);
        expect(isIP('0200.200.200.200')).toBe(false);
        expect(isIP('200.0200.200.200')).toBe(false);
        expect(isIP('200.200.0200.200')).toBe(false);
        expect(isIP('200.200.200.0200')).toBe(false);
        expect(isIP('::banana')).toBe(false);
        expect(isIP('banana::')).toBe(false);
        expect(isIP('::1banana')).toBe(false);
        expect(isIP('::1::')).toBe(false);
        expect(isIP('1:')).toBe(false);
        expect(isIP(':1')).toBe(false);
        expect(isIP(':1:1:1::2')).toBe(false);
        expect(isIP('1:1:1:1:1:1:1:1:1:1:1:1:1:1:1:1')).toBe(false);
        expect(isIP('::11111')).toBe(false);
        expect(isIP('11111:1:1:1:1:1:1:1')).toBe(false);
        expect(isIP('2001:db8:0000:1:1:1:1::1')).toBe(false);
        expect(isIP('0:0:0:0:0:0:ffff:127.0.0.1')).toBe(false);
        expect(isIP('0:0:0:0:ffff:127.0.0.1')).toBe(false);

        expect(isIP('2001:db8:0000:1:1:1:1:1')).toBe(true);
        expect(isIP('::ffff:127.0.0.1')).toBe(true);
        expect(isIP('137.132.10.01')).toBe(false);
        expect(isIP('0.256.0.256')).toBe(false);
        expect(isIP('255.256.255.256')).toBe(false);
        expect(isIP('::ffff:287.0.0.1')).toBe(false);
    });

    test('测试4', () => {
        expect(isIP('fe80::1234%1')).toBe(true);

        expect(isIP('%')).toBe(false);
        expect(isIP('ff08::9abc%interface10')).toBe(false);
        expect(isIP('ff02::5678%pvc1.3')).toBe(false);
        expect(isIP('ff08::9abc%10')).toBe(false);
        expect(isIP('fe80::1234%')).toBe(false);
        expect(isIP('fe80::1234%1%3%4')).toBe(false);
        expect(isIP('fe80%fe80%')).toBe(false);
    });
});
