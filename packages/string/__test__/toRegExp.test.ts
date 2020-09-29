// @ts-nocheck
import { toRegExp } from '../src';

describe('@curong/string/toRegExp', () => {
    test('测试1', () => {
        expect(toRegExp).toThrowError();
        expect(() => toRegExp('', null)).toThrowError();
    });

    test('测试2', () => {
        expect(toRegExp('xx\\xx', 'g')).toStrictEqual(/xx\\xx/g);
        expect(toRegExp('+', 'g')).toStrictEqual(/\+/g);
        expect(toRegExp('\\d+', 'g')).toStrictEqual(/\\d\+/g);
    });
});
