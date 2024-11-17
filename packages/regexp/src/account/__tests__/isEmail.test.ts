import { isEmail } from '..';

const repeat = (str: string, count: number) => {
    let result = '';

    for (; count; count--) {
        result += str;
    }

    return result;
};

describe('@curong/regexp/isEmail', () => {
    test('测试1', () => {
        expect(isEmail('xx@xx@xx.com')).toBe(false);
        expect(isEmail('xx.\\xx@xx.com')).toBe(false);
        expect(isEmail('xx. \\xx@xx.com')).toBe(false);
        expect(isEmail('   ')).toBe(false);
        expect(isEmail('value')).toBe(false);
        expect(isEmail('value.fr')).toBe(false);
        expect(isEmail('Hello')).toBe(false);
        expect(isEmail('test.test.com')).toBe(false);
        expect(isEmail('ccc.com')).toBe(false);
        expect(isEmail('xxx')).toBe(false);
        expect(isEmail('invalid email address')).toBe(false);
        expect(isEmail('#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})')).toBe(false);
        expect(isEmail('email@domain')).toBe(false);
        expect(isEmail('x-@-x.co')).toBe(false);
        expect(isEmail('test.test@com')).toBe(false);
    });

    test('测试2', () => {
        // https://zh.wikipedia.org/zh-cn/電子郵件地址#域名
        expect(isEmail('xx@[0.0.0.0]')).toBe(true);
    });

    test('测试3', () => {
        expect(isEmail('xx./xx@xx.com')).toBe(true);
        expect(isEmail('x212$x./xx@xx.com')).toBe(true);
        expect(isEmail('!xxx!xxx%x@xx.com')).toBe(true);
        expect(isEmail('00@xx.com.cn')).toBe(true);
        expect(isEmail('xx@33.com')).toBe(true);
        expect(isEmail('xx.100@xx.com')).toBe(true);
        expect(isEmail('xx-33@xx.com')).toBe(true);
        expect(isEmail('__p/gbhn21.xxx@xxx.co')).toBe(true);

        expect(isEmail('wangdaoo@yeah.net')).toBe(true);
        expect(isEmail('ff@gmail.com')).toBe(true);
        expect(isEmail('https://sss.cc')).toBe(false);

        expect(isEmail('email@domain.fr')).toBe(true);
        expect(isEmail('test@test.com')).toBe(true);
        expect(isEmail('test@test.co.com')).toBe(true);

        expect(isEmail('john@google.com')).toBe(true);
        expect(isEmail('alex@bloomberg.uk')).toBe(true);
        expect(isEmail('anna@coop.ch')).toBe(true);
        expect(isEmail('lakera@ai.org')).toBe(true);
        expect(isEmail('dev@oneuptime.com')).toBe(true);
        expect(isEmail('dev@yahoo.co.uk')).toBe(true);
        expect(isEmail('test@test.com')).toBe(true);
        expect(isEmail('hello@oneuptime.com')).toBe(true);

        expect(isEmail('xx@xx.co')).toBe(true);
        expect(isEmail('x@x.xx')).toBe(true);
        expect(isEmail('z@xx.co')).toBe(true);
        expect(isEmail('xx@x.cc')).toBe(true);
        expect(isEmail('xx@xx.xx')).toBe(true);
        expect(isEmail('a@xxxxxxx.cxo')).toBe(true);
    });

    test('测试3', () => {
        expect(isEmail('x'.repeat(64) + '@xx.xx')).toBe(true);
        expect(isEmail('x'.repeat(65) + '@xx.xx')).toBe(false);
        expect(isEmail(`${'x'.repeat(64)}@${'x'.repeat(64)}.xx`)).toBe(true);
        expect(isEmail(`${'x'.repeat(64)}@${'x'.repeat(65)}.xx`)).toBe(false);
        expect(isEmail(`${'x'.repeat(64)}@${'x'.repeat(252)}.xx`)).toBe(false);
        expect(isEmail(`${'x'.repeat(64)}@${'x'.repeat(253)}.xx`)).toBe(false);
        expect(isEmail('xx.xx@' + 'x'.repeat(64) + '.xx')).toBe(true);
        expect(isEmail('xx.xx@' + 'x'.repeat(65) + '.xx')).toBe(false);
        expect(
            isEmail('xx.xx@' + 'x'.repeat(64) + '.' + 'x'.repeat(64) + '.xx')
        ).toBe(true);
        expect(
            isEmail('xx.xx@' + 'x'.repeat(65) + '.' + 'x'.repeat(65) + '.xx')
        ).toBe(false);
        expect(
            isEmail('xx.xx@' + 'x'.repeat(65) + 'x'.repeat(65) + '.xx')
        ).toBe(false);
    });

    test('测试4', () => {
        const emails = [
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@letters-in-local.org',
            '01234567890@numbers-in-local.net',
            "&'*+-./=?^_{}~@other-valid-characters-in-local.net",
            'mixed-1234-in-{+^}-local@sld.net',
            'a@single-character-in-local.org',
            'one-character-third-level@a.example.com',
            'single-character-in-sld@x.org',
            'local@dash-in-sld.com',
            'letters-in-sld@123.com',
            'one-letter-sld@x.org',
            'test@test--1.com',
            'uncommon-tld@sld.museum',
            'uncommon-tld@sld.travel',
            'uncommon-tld@sld.mobi',
            'country-code-tld@sld.uk',
            'country-code-tld@sld.rw',
            'local@sld.newTLD',
            'the-total-length@of-an-entire-address.cannot-be-longer-than-two-hundred-and-fifty-four-characters.and-this-address-is-254-characters-exactly.so-it-should-be-valid.and-im-going-to-add-some-more-words-here.to-increase-the-length-blah-blah-blah-blah-bla.org',
            'the-character-limit@for-each-part.of-the-domain.is-sixty-three-characters.this-is-exactly-sixty-three-characters-so-it-is-valid-blah-blah.com',
            'local@sub.domains.com',
            'backticks`are`legit@test.com',
            'digit-only-domain@123.com',
            'digit-only-domain-with-subdomain@sub.123.com',
            '`a@a.fr',
            '`aa@fr.com',
            'com@sil.c1m',
            't119037jskc_ihndkdoz@aakctgajathzffcsuqyjhgjuxnuulgnhxtnbquwtgxljfayeestsjdbalthtddy.lgtmsdhywswlameglunsaplsblljavswxrltovagexhtttodqedmicsekvpmpuu.pgjvdmvzyltpixvalfbktnnpjyjqswbfvtpbfsngqtmhgamhrbqqvyvlhqigggv.nxqglspfbwdhtfpibcrccvctmoxuxwlunghhwacjtrclgirrgppvshxvrzkoifl'
        ];

        expect(emails.every(isEmail)).toBe(true);
    });

    test('测试5', () => {
        const emails = [
            '"quoted"@sld.com',
            '"\\e\\s\\c\\a\\p\\e\\d"@sld.com',
            '"quoted-at-sign@sld.org"@sld.com',
            '"escaped\\"quote"@sld.com',
            '"back\\slash"@sld.com',
            'punycode-numbers-in-tld@sld.xn--3e0b707e',
            'bracketed-IP-instead-of-domain@[127.0.0.1]'
        ];

        expect(emails.every(isEmail)).toBe(false);
    });

    test('测试6', () => {
        const emails = [
            '@missing-local.org',
            '! #$%`|@invalid-characters-in-local.org',
            '(),:;`|@more-invalid-characters-in-local.org',
            '<>@[]\\`|@even-more-invalid-characters-in-local.org',
            '.local-starts-with-dot@sld.com',
            'local-ends-with-dot.@sld.com',
            'two..consecutive-dots@sld.com',
            'partially."quoted"@sld.com',
            'the-local-part-is-invalid-if-it-is-longer-than-sixty-four-characters@sld.net',
            'missing-sld@.com',
            'sld-starts-with-dashsh@-sld.com',
            'sld-ends-with-dash@sld-.com',
            'invalid-characters-in-sld@! "#$%(),/;<>_[]`|.org',
            'missing-dot-before-tld@com',
            'missing-tld@sld.',
            'invalid',
            'the-total-length@of-an-entire-address.cannot-be-longer-than-two-hundred-and-fifty-six-characters.and-this-address-is-257-characters-exactly.so-it-should-be-invalid.and-im-going-to-add-some-more-words-here.to-increase-the-length-blah-blah-blah-blah-blah-.org',
            'the-character-limit@for-each-part.of-the-domain.is-sixty-three-characters.this-is-exactly-sixty-four-characters-so-it-is-invalid-blah-blah.com',
            'missing-at-sign.net',
            'unbracketed-IP@127.0.0.1',
            'invalid-ip@127.0.0.1.26',
            'another-invalid-ip@127.0.0.256',
            'IP-and-port@127.0.0.1:25',
            'trailing-dots@test.de.',
            'dot-on-dot-in-domainname@te..st.de',
            'dot-first-in-domain@.test.de',
            'mg@ns.i',
            '.dot-start-and-end.@sil.com',
            'double@a@com',
            '',
            'tr119037jskc_ihndkdoz@d.aakctgajathzffcsuqyjhgjuxnuulgnhxtnbquwtgxljfayeestsjdbalthtddy.lgtmsdhywswlameglunsaplsblljavswxrltovagexhtttodqedmicsekvpmpuu.pgjvdmvzyltpixvalfbktnnpjyjqswbfvtpbfsngqtmhgamhrbqqvyvlhqigggv.nxqglspfbwdhtfpibcrccvctmoxuxwlunghhwacjtrclgirrgppvshxvrzkoifl'
        ];

        expect(emails.every(isEmail)).toBe(false);
    });

    test('测试7', () => {
        expect(isEmail('foo@bar.com')).toBe(true);
        expect(isEmail('x@x.au')).toBe(true);
        expect(isEmail('foo@bar.com.au')).toBe(true);
        expect(isEmail('foo+bar@bar.com')).toBe(true);
        expect(isEmail('test123+ext@gmail.com')).toBe(true);
        expect(isEmail('some.name.midd.leNa.me+extension@GoogleMail.com')).toBe(
            true
        );
        expect(isEmail(`${repeat('a', 64)}@${repeat('a', 63)}.com`)).toBe(true);
        expect(isEmail(`${repeat('a', 64)}@${repeat('a', 63)}.com`)).toBe(true);
        expect(isEmail(`${repeat('a', 31)}@gmail.com`)).toBe(true);
        expect(isEmail('test@gmail.com')).toBe(true);
        expect(isEmail('test.1@gmail.com')).toBe(true);
        expect(isEmail('z@co.c')).toBe(true);
        expect(isEmail(`${repeat('a', 64)}@${repeat('a', 64)}.com`)).toBe(true);
    });

    test('测试8', () => {
        expect(isEmail('hans.m端ller@test.com')).toBe(false);
        expect(isEmail('hans@m端ller.com')).toBe(false);
        expect(isEmail('test|123@m端ller.com')).toBe(false);
        expect(isEmail('"foobar"@example.com')).toBe(false);
        expect(isEmail('"  foo  m端ller "@example.com')).toBe(false);
        expect(isEmail('"foo\\@bar"@example.com')).toBe(false);

        expect(isEmail('invalidemail@')).toBe(false);
        expect(isEmail('invalid.com')).toBe(false);
        expect(isEmail('@invalid.com')).toBe(false);
        expect(isEmail('foo@bar.com.')).toBe(false);
        expect(isEmail('somename@ｇｍａｉｌ.com')).toBe(false);
        expect(isEmail('foo@bar.co.uk.')).toBe(false);

        expect(
            isEmail(
                'ｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌ@gmail.com'
            )
        ).toBe(false);
        expect(isEmail(`${repeat('a', 64)}@${repeat('a', 251)}.com`)).toBe(
            false
        );
        expect(isEmail(`${repeat('a', 65)}@${repeat('a', 250)}.com`)).toBe(
            false
        );
        expect(isEmail('a')).toBe(false);
        expect(isEmail(`)}.${repeat('a', 58)}.com`)).toBe(false);
        expect(isEmail('test1@invalid.co m')).toBe(false);
        expect(isEmail('test2@invalid.co m')).toBe(false);
        expect(isEmail('test3@invalid.co m')).toBe(false);
        expect(isEmail('test4@invalid.co m')).toBe(false);
        expect(isEmail('test5@invalid.co m')).toBe(false);
        expect(isEmail('test6@invalid.co m')).toBe(false);
        expect(isEmail('test7@invalid.co m')).toBe(false);
        expect(isEmail('test8@invalid.co m')).toBe(false);
        expect(isEmail('test9@invalid.co m')).toBe(false);
        expect(isEmail('test10@invalid.co m')).toBe(false);
        expect(isEmail('test11@invalid.co m')).toBe(false);
        expect(isEmail('test12@invalid.co　m')).toBe(false);
        expect(isEmail('test13@invalid.co　m')).toBe(false);
        expect(isEmail('multiple..dots@stillinvalid.com')).toBe(false);
        expect(isEmail('test123+invalid! sub_address@gmail.com')).toBe(false);
        expect(isEmail('gmail...ignores...dots...@gmail.com')).toBe(false);
        expect(isEmail('ends.with.dot.@gmail.com')).toBe(false);
        expect(isEmail('multiple..dots@gmail.com')).toBe(false);
        expect(isEmail('wrong()[]",:;<>@@gmail.com')).toBe(false);
        expect(isEmail('"wrong()[]",:;<>@@gmail.com')).toBe(false);
        expect(isEmail('username@domain.com�')).toBe(false);
        expect(isEmail('username@domain.com©')).toBe(false);
    });
});
