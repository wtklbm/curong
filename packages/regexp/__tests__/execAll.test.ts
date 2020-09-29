// @ts-nocheck
import { execAll } from '../src';

describe('@curong/regexp/execAll', () => {
    test('测试1', () => {
        const res = execAll(/\d+/g, 'world12hello');
        expect(res[0][0]).toBe('12');
        expect(res[0]['index']).toBe(5);
        expect(res[0]['groups']).toBe(undefined);
    });

    test('测试2', () => {
        expect(execAll).toThrow();
    });

    test('测试3', () => {
        expect(() => execAll(/\d+/g)).toThrow(
            '[execAll]: str不是一个字符串, "undefined"'
        );
    });

    test('测试3', () => {
        expect(() => execAll(/\d+/g, 'wo', 'xxx')).toThrow(
            '[execAll]: id不是预期的值, "xxx"'
        );
    });

    test('测试4', () => {
        const res = execAll(/\d+/g, 'xxx12xxx', '0');
        expect(res[0]).toBe('12');
    });

    test('测试5', () => {
        const res = execAll(/\d+/, 'xxx12xxx', '0');
        expect(res[0]).toBe('12');
    });

    test('测试5', () => {
        const res = execAll(/\d+/, 'xxx12xxx23xxx34', m => m[0]);
        expect(res[0]).toBe('12');
    });

    test('测试6', () => {
        const res = execAll(/\d+/, '', m => m[0]);
        expect(res).toBe(undefined);
    });

    test('测试7', () => {
        const res = execAll(/\d+/, '', m => {
            console.log(m[0]);
        });
        expect(res).toBe(undefined);
    });
});
