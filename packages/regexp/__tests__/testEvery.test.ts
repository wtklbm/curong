// @ts-nocheck
import { testEvery } from '../src';

describe('@curong/regexp/testEvery', () => {
    test('测试1', () => {
        expect(testEvery).toThrowError();
    });

    test('测试2', () => {
        // @ts-ignore
        expect(() => testEvery([/\d+/])).toThrowError();
    });

    test('测试3', () => {
        const regexps = [/\d+/, /\w+/];
        const str = 'hello 123 world!';
        const res = testEvery(regexps, str);

        expect(res).toBe(true);
    });

    test('测试4', () => {
        const regexps = [/^\d+$/, /\w+/];
        const str = 'hello 123 world!';
        const res = testEvery(regexps, str);

        expect(res).toBe(false);
    });

    test('测试5', () => {
        const regexps = [/\d+/, /^[\w ]+$/];
        const str = 'hello 123 world';
        const res = testEvery(regexps, str);

        expect(res).toBe(true);
    });

    test('测试6', () => {
        // @ts-ignore
        expect(() => testEvery(123, 'xxx')).toThrowError();
    });

    test('测试7', () => {
        const regexps = [/\d+/, 0, /^[\w ]+$/];
        const str = 'hello 123 world';

        // @ts-ignore
        expect(() => testEvery(regexps, str)).toThrowError();
    });

    test('测试8', () => {
        expect(testEvery([/\d+/], '')).toBe(false);
    });

    test('测试9', () => {
        expect(testEvery([], 'xxx')).toBe(true);
    });

    test('测试10', () => {
        expect(() => testEvery([], '')).toThrowError();
        expect(() => testEvery([], null)).toThrowError();
        expect(() => testEvery(null, null)).toThrowError();
    });
});
