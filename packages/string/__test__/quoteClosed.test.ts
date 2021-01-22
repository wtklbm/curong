
import { quoteClosed } from '../src';

describe('@curong/string/quoteClosed', () => {
    test('测试1：', () => {
        expect(quoteClosed(`;"this {is} a [i'm] (for) ok."/**`)).toBe('');
    });

    test('测试2：', () => {
        expect(quoteClosed(`'this is a i'm for ok.'/**`)).toBe('');
    });

    test('测试3：', () => {
        expect(quoteClosed(`"this is a i'm for ok."';/**`)).toBe('');
    });

    test('测试4：', () => {
        expect(quoteClosed(`'this is a i'm for ok.'"]/**`)).toBe('');
    });

    test('测试5：', () => {
        expect(quoteClosed(`"this is a i\\"m for ok."/**`)).toBe('');
    });

    test('测试6：', () => {
        expect(quoteClosed(`'this is a i\\'m for ok.'/**`)).toBe('');
    });

    test('测试7：', () => {
        expect(
            quoteClosed(`"this is a i\\"m for ok'"'\`\\"\\'' xxx "\\"'\\"'"/**`)
        ).toBe('');
    });

    test('测试8：', () => {
        expect(
            quoteClosed(`'this is a i\\'m for ok.'"\`''\`"'\`"'"\`/**`)
        ).toBe("'");
    });

    test('测试9：', () => {
        expect(
            quoteClosed(`'}this is a i\\'m for ok.'"\`''\`"'\`"'"\`/**`)
        ).toBe('');
    });

    test('测试10', () => {
        expect(quoteClosed('xxx;"')).toBe('"');
    });

    test('测试11', () => {
        expect(quoteClosed('"xxx"}"')).toBe('"');
    });

    test('测试12', () => {
        expect(quoteClosed('xxx;""')).toBe('');
    });

    test('测试13', () => {
        expect(quoteClosed('xxx} \';""')).toBe('');
        expect(quoteClosed('xxx}')).toBe('');
        expect(quoteClosed('xxx{ \';""')).toBe('');
        expect(quoteClosed('xxx( \';""')).toBe('');
        expect(quoteClosed('xxx) \';""')).toBe('');
        expect(quoteClosed('xxx[ \';""')).toBe('');
        expect(quoteClosed('xxx] \';""')).toBe('');
        expect(quoteClosed(`}xxx"xxx\\"xxx"`)).toBe('');
        expect(quoteClosed(`x;x', xx, \\' end's xx' xx`)).toBe('');
    });
});
