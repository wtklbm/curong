import { isURLString } from '../src';

describe('@curong/types/isURLString', () => {
    it('测试1', () => {
        expect(isURLString(12345)).toBe(false);
        expect(isURLString('not a url')).toBe(false);
        expect(isURLString('')).toBe(false);
        expect(isURLString('http://')).toBe(false);
        expect(isURLString('https://')).toBe(false);
    });

    it('测试2', () => {
        expect(isURLString('https://www.example.com')).toBe(true);
        expect(isURLString('ftp://ftp.example.com')).toBe(true);
        expect(isURLString('mailto:example@example.com')).toBe(true);
        expect(isURLString('file:///path/to/file')).toBe(true);
    });
});
