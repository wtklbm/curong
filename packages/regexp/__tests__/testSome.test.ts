// @ts-nocheck
import { testSome } from '../src';

describe('@curong/regexp/testSome', () => {
    test('测试1', () => {
        expect(testSome).toThrowError();
    });

    test('测试2', () => {
        // @ts-ignore
        expect(() => testSome([/\d+/])).toThrowError();
    });

    test('测试3', () => {
        const regexps = [/\d+/, /\w+/];
        const str = 'hello 123 world!';
        const res = testSome(regexps, str);

        expect(res).toBe(true);
    });

    test('测试4', () => {
        const regexps = [/^\d+$/, /\w+/];
        const str = 'hello 123 world!';
        const res = testSome(regexps, str);

        expect(res).toBe(true);
    });

    test('测试5', () => {
        const regexps = [/\d+/, /^[\w ]+$/];
        const str = 'hello 123 world';
        const res = testSome(regexps, str);

        expect(res).toBe(true);
    });

    test('测试6', () => {
        // @ts-ignore
        expect(() => testSome(123, 'xxx')).toThrowError();
    });

    test('测试7', () => {
        const regexps = [/\d+/, 0, /^[\w ]+$/];
        const str = 'hello 123 world';

        expect(testSome(regexps, str)).toBe(true);
    });

    test('测试8', () => {
        expect(testSome([/\d+/], '')).toBe(false);
    });

    test('测试9', () => {
        expect(testSome([], 'xxx')).toBe(false);
    });
});
