import { isIPv6 } from '..';

describe('@curong/regexp/isIPv6', () => {
    test('测试1', () => {
        expect(isIPv6('d329:1be4:25b4:db47:a9d1:dc71:4926:992c:14af')).toBe(
            false
        );
        expect(isIPv6('d5e7:7214:2b78::3906:85e6:53cc:709:32ba')).toBe(false);
        expect(isIPv6('8f69::c757:395e:976e::3441')).toBe(false);
        expect(isIPv6('54cb::473f:d516:0.255.256.22')).toBe(false);
        expect(isIPv6('54cb::473f:d516:192.168.1')).toBe(false);
        expect(isIPv6('test:test:test:test:test:test:test:test')).toBe(false);

        expect(isIPv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
        expect(isIPv6('2001:0db8:85a3:::8a2e:0370:7334')).toBe(false);

        expect(isIPv6('2001:db8::7/32')).toBe(false);
        expect(isIPv6('a:b:c:d:e::1.2.3.4/13')).toBe(false);
        expect(isIPv6('a:b:c:d:e::1.2.3.4/64')).toBe(false);
        expect(isIPv6('FEDC:BA98:7654:3210:FEDC:BA98:7654:3210/0')).toBe(false);
        expect(isIPv6('FEDC:BA98:7654:3210:FEDC:BA98:7654:3210/32')).toBe(
            false
        );
        expect(isIPv6('FEDC:BA98:7654:3210:FEDC:BA98:7654:3210/128')).toBe(
            false
        );
        expect(isIPv6('1080:0:0:0:8:800:200C:417A/27')).toBe(false);
        expect(isIPv6('a:b:c:d:e::1.2.3.4')).toBe(false);
    });

    test('测试1', () => {
        expect(isIPv6('::1')).toBe(true);
        expect(isIPv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
        expect(isIPv6('FE80:0000:0000:0000:0202:B3FF:FE1E:8329')).toBe(true);
        expect(isIPv6('fe80::1ff:fe23:4567:890a')).toBe(true);
        expect(isIPv6('2001:db8:85a3:8d3:1319:8a2e:370:7348')).toBe(true);
        expect(isIPv6('2001:db8::7')).toBe(true);
        expect(isIPv6('FEDC:BA98:7654:3210:FEDC:BA98:7654:3210')).toBe(true);
        expect(isIPv6('FEDC:BA98:7654:3210:FEDC:BA98:7654:3210')).toBe(true);
        expect(isIPv6('1080:0:0:0:8:800:200C:417A')).toBe(true);
        expect(isIPv6('::1:2:3:4:5:6:7')).toBe(true);
        expect(isIPv6('::1:2:3:4:5:6')).toBe(true);
        expect(isIPv6('1::1:2:3:4:5:6')).toBe(true);
        expect(isIPv6('::1:2:3:4:5')).toBe(true);
        expect(isIPv6('1::1:2:3:4:5')).toBe(true);
        expect(isIPv6('2:1::1:2:3:4:5')).toBe(true);
        expect(isIPv6('::1:2:3:4')).toBe(true);
        expect(isIPv6('1::1:2:3:4')).toBe(true);
        expect(isIPv6('2:1::1:2:3:4')).toBe(true);
        expect(isIPv6('3:2:1::1:2:3:4')).toBe(true);
        expect(isIPv6('::1:2:3')).toBe(true);
        expect(isIPv6('1::1:2:3')).toBe(true);
        expect(isIPv6('2:1::1:2:3')).toBe(true);
        expect(isIPv6('3:2:1::1:2:3')).toBe(true);
        expect(isIPv6('4:3:2:1::1:2:3')).toBe(true);
        expect(isIPv6('::1:2')).toBe(true);
        expect(isIPv6('1::1:2')).toBe(true);
        expect(isIPv6('2:1::1:2')).toBe(true);
        expect(isIPv6('3:2:1::1:2')).toBe(true);
        expect(isIPv6('4:3:2:1::1:2')).toBe(true);
        expect(isIPv6('5:4:3:2:1::1:2')).toBe(true);
        expect(isIPv6('::1')).toBe(true);
        expect(isIPv6('1::1')).toBe(true);
        expect(isIPv6('2:1::1')).toBe(true);
        expect(isIPv6('3:2:1::1')).toBe(true);
        expect(isIPv6('4:3:2:1::1')).toBe(true);
        expect(isIPv6('5:4:3:2:1::1')).toBe(true);
        expect(isIPv6('6:5:4:3:2:1::1')).toBe(true);
        expect(isIPv6('::')).toBe(true);
        expect(isIPv6('1::')).toBe(true);
        expect(isIPv6('2:1::')).toBe(true);
        expect(isIPv6('3:2:1::')).toBe(true);
        expect(isIPv6('4:3:2:1::')).toBe(true);
        expect(isIPv6('5:4:3:2:1::')).toBe(true);
        expect(isIPv6('6:5:4:3:2:1::')).toBe(true);
        expect(isIPv6('7:6:5:4:3:2:1::')).toBe(true);
    });
});
