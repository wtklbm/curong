// @ts-nocheck
import { quotePair } from '../src';

describe('@curong/string/quotePair', () => {
    test('测试1：', () => {
        expect(quotePair(`"this is a i'm for ok."/**`)).toBe('');
    });

    test('测试2：', () => {
        expect(quotePair(`'this is a i'm for ok.'/**`)).toBe('');
    });

    test('测试3：', () => {
        expect(quotePair(`"this is a i'm for ok."'/**`)).toBe("'");
    });

    test('测试4：', () => {
        expect(quotePair(`'this is a i'm for ok.'"/**`)).toBe('"');
    });

    test('测试5：', () => {
        expect(quotePair(`"this is a i\\"m for ok."/**`)).toBe('');
    });

    test('测试6：', () => {
        expect(quotePair(`'this is a i\\'m for ok.'/**`)).toBe('');
    });

    test('测试7：', () => {
        expect(
            quotePair(`"this is a i\\"m for ok'"'\`\\"\\'' xxx "\\"'\\"'"/**`)
        ).toBe('');
    });

    test('测试8：', () => {
        expect(quotePair(`'this is a i\\'m for ok.'"\`''\`"'\`"'"\`/**`)).toBe(
            '"'
        );
    });

    test('测试9', () => {
        expect(() => quotePair(12)).toThrow();
        expect(quotePair('xxx;"')).toBe('"');
        expect(quotePair(`xx 'xx \\ xx'`)).toBe('');
        expect(quotePair(`xxx\\';"`)).toBe("'");
        expect(quotePair('xxx;""')).toBe('');
        expect(quotePair(`xxx\\';""`)).toBe("'");
        expect(quotePair(`xxx i'm xxx`)).toBe("'");
        expect(quotePair(`xxx "xx i'm xx" xxx`)).toBe('');
        expect(quotePair(`xxx 'xx i\'m xx' xxx`)).toBe('');
        expect(quotePair(`xxx  "xxx \\s xxx" xxx`)).toBe('');
    });
});
