import { testSome } from '../src';

describe('@curong/regexp/testSome', () => {
    test('测试1', () => {
        expect(testSome).toThrowError();
    });

    test('测试2', () => {
        expect(testSome([], 'xxx')).toBe(false);
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
        expect(testSome([/\d+/], '')).toBe(false);
    });
});
