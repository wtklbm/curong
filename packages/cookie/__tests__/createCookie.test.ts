import { createCookie } from '../src';

describe('@curong/cookie/createCookie', () => {
    test('测试1', () => {
        const cookie = createCookie('wtklbm', 'value', {
            encode(value) {
                return value;
            },
            maxAge: 10,
            domain: '/',
            path: '/xxx',
            expires: new Date('2020-01-01'),
            httpOnly: true,
            secure: true,
            sameSite: true
        });

        expect(cookie).toBe(
            'wtklbm=value; Max-Age=10; Domain=/; Path=/xxx; Expires=Wed, 01 Jan 2020 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict'
        );
    });
});
