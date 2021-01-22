import { testEvery } from '../src';

describe('@curong/regexp/testEvery', () => {
    test('测试1', () => {
        expect(testEvery).toThrowError();
    });

    test('测试2', () => {
        const regexps = [/\d+/, /^[\w ]+$/];
        const str = 'hello 123 world';
        const res = testEvery(regexps, str);

        expect(res).toBe(true);
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
        expect(() => testEvery([], '')).toThrowError();
    });

    test('测试6', () => {
        expect(testEvery([/\d+/], '')).toBe(false);
    });

    test('测试7', () => {
        expect(testEvery([], 'xxx')).toBe(true);
    });
});
