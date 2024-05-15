import { isArray } from '@curong/types';

import { execAll } from '../src';

describe('@curong/regexp/execAll', () => {
    test('测试1', () => {
        const res = execAll(/\d+/g, 'world12hello');
        if (isArray(res) && isArray(res[0])) {
            expect(res[0][0]).toBe('12');
            expect(res[0]['index']).toBe(5);
            expect(res[0]['groups']).toEqual(undefined);
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
        expect(res).toEqual([]);
    });

    test('测试3', () => {
        // @ts-ignore
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
        expect(res).toEqual([]);
    });

    test('测试7', () => {
        let index = 0;
        const res = execAll(/\d+/, 'wo123ni456', m => ({
            index: index++,
            value: m[0]
        }));

        expect(res).toEqual([{ index: 0, value: '123' }]);
    });

    test('测试8', () => {
        let index = 0;

        const res = execAll(/\d+/g, 'wo123ni456', m => ({
            index: index++,
            value: m[0]
        }));

        expect(res).toEqual([
            { index: 0, value: '123' },
            { index: 1, value: '456' }
        ]);
    });

    test('测试9', () => {
        const res = execAll(/\d+/g, 'wo123ni456', m => {});

        expect(res).toEqual(undefined);
    });

    test('测试10', () => {
        const res = execAll(/\d+/g, 'wo123ni456', m => null);

        expect(res).toEqual(undefined);
    });

    test('测试11', () => {
        let index = 0;
        const res = execAll(/\d+/g, 'wo123ni456', m =>
            ++index % 2 ? null : undefined
        );

        expect(res).toEqual([null, undefined]);
    });
});
