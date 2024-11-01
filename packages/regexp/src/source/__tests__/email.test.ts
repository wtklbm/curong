import { email } from '..';

describe('@curong/regexp/email', () => {
    const emailRegex = new RegExp(`^(?:${email})$`);
    const isEmail = (v: string) => emailRegex.test(v);

    test('测试1', () => {
        expect(isEmail('wangdaoo@yeah.net')).toBe(true);
        expect(isEmail('#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})')).toBe(false);
        expect(isEmail('Hello')).toBe(false);
        expect(isEmail('ff@gmail.com')).toBe(true);
        expect(isEmail('https://sss.cc')).toBe(false);
        expect(isEmail('value')).toBe(false);
        expect(isEmail('value.fr')).toBe(false);
        // expect(isEmail('email@domain')).toBe(false);
        expect(isEmail('email@domain.fr')).toBe(true);
        expect(isEmail('   ')).toBe(false);

        expect(isEmail('test@test.com')).toBe(true);
        expect(isEmail('test@test.co.com')).toBe(true);
        expect(isEmail('test.test.com')).toBe(false);
        expect(isEmail('ccc.com')).toBe(false);
        expect(isEmail('xxx')).toBe(false);
        // expect(isEmail('test.test@com')).toBe(false);

        expect(isEmail('john@google.com')).toBe(true);
        expect(isEmail('alex@bloomberg.uk')).toBe(true);
        expect(isEmail('anna@coop.ch')).toBe(true);
        expect(isEmail('lakera@ai.org')).toBe(true);
    });
});
