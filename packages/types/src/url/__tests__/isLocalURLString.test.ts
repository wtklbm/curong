import { isLocalURLString } from '..';

describe('@curong/types/isLocalURLString', () => {
    test('测试1', () => {
        expect(isLocalURLString(12)).toBe(false);
        expect(isLocalURLString(new URL('https://www.q.com'))).toBe(false);
        expect(isLocalURLString(new URL('https://www.q.com:443'))).toBe(false);
        expect(isLocalURLString(new URL('http://www.q.com'))).toBe(false);
        expect(isLocalURLString(new URL('http://www.q.com:80'))).toBe(false);
    });

    test('测试2', () => {
        expect(isLocalURLString('http://localhost:3000')).toBe(true);
        expect(isLocalURLString('https://localhost:1337')).toBe(true);
        expect(isLocalURLString('https://127.0.0.1:8080')).toBe(true);
        expect(isLocalURLString('http://192.168.4.50:3000/')).toBe(true);
        expect(isLocalURLString('http://10.0.0.0/8/')).toBe(true);
        expect(isLocalURLString('http://127.0.0.1:80')).toBe(true);
        expect(isLocalURLString('http://0.0.0.0:80')).toBe(true);
        expect(isLocalURLString('http://127.0.1.0:80')).toBe(true);
        expect(isLocalURLString('http://[::]:3000/')).toBe(true);
        expect(isLocalURLString('http://[::1]:3000/')).toBe(true);
    });
});
