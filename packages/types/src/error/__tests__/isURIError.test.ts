import { isURIError } from '..';

describe('@curong/types/isURIError', () => {
    test('测试1', () => {
        expect(isURIError(new Error())).toBe(false);
    });

    test('测试2', () => {
        try {
            decodeURIComponent('%');
        } catch (e: any) {
            expect(isURIError(e)).toBe(true);
            expect(e instanceof URIError).toBe(true);
            expect(e.message).toBe('URI malformed');
            expect(e.name).toBe('URIError');
        }
    });
});
