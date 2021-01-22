import { execAll } from '../src';
import { isArray } from '../../types/src';

describe('@curong/regexp/execAll', () => {
    test('测试1', () => {
        const res = execAll(/\d+/g, 'world12hello');
        if (isArray(res) && isArray(res[0])) {
            expect(res[0][0]).toBe('12');
            expect(res[0]['index']).toBe(5);
            expect(res[0]['groups']).toBe(undefined);
            return;
        }

        throw new Error('不可到达的');
    });

    test('测试2', () => {
        expect(execAll).toThrow();
    });

    test('测试3', () => {
        const res = execAll(/\d+/, '', m => {
            console.log(m[0]);
        });
        expect(res).toBe(undefined);
    });

    test('测试3', () => {
        expect(() => execAll(/\d+/g, 'wo', 'xxx')).toThrow(
            '[execAll]: id不是预期的值, "xxx"'
        );
    });

    test('测试4', () => {
        const res = execAll(/\d+/g, 'xxx12xxx', '0');
        if (isArray(res)) {
            expect(res[0]).toBe('12');
            return;
        }

        throw new Error('不可到达的');
    });

    test('测试5', () => {
        const res = execAll(/\d+/, 'xxx12xxx', '0');
        if (isArray(res)) {
            expect(res[0]).toBe('12');
            return;
        }

        throw new Error('不可到达的');
    });

    test('测试5', () => {
        const res = execAll(/\d+/, 'xxx12xxx23xxx34', m => m[0]);
        if (isArray(res)) {
            expect(res[0]).toBe('12');
            return;
        }

        throw new Error('不可到达的');
    });

    test('测试6', () => {
        const res = execAll(/\d+/, '', m => m[0]);
        expect(res).toBe(undefined);
    });
});
