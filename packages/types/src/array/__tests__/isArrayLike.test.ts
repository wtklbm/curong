// @ts-nocheck

import { isArrayLike } from '..';

describe('@curong/types/isArrayLike', () => {
    test('测试1', () => {
        expect(isArrayLike(null)).toBe(false);
        expect(isArrayLike(undefined)).toBe(false);
        expect(isArrayLike(function a() {})).toBe(false);
        expect(isArrayLike([])).toBe(false);
        expect(isArrayLike([1, 2, 3, 4])).toBe(false);
        expect(isArrayLike([1, , , 4])).toBe(false);
        expect(isArrayLike({})).toBe(false);
        expect(isArrayLike({ key: 'value' })).toBe(false);
        expect(isArrayLike({ key: 'value' }, 1)).toBe(false);
        expect(isArrayLike(0)).toBe(false);
        expect(isArrayLike('string')).toBe(false);
        expect(isArrayLike(new Date())).toBe(false);
        expect(isArrayLike((arg1, arg2) => {})).toBe(false);
    });

    test('测试2', () => {
        expect(isArrayLike(Buffer.from([0, 1]))).toBe(true);
        expect(isArrayLike(new Uint8Array(2))).toBe(true);

        function fn1() {
            expect(isArrayLike(arguments)).toBe(true);
        }

        fn1();

        function fn2(a: number) {
            expect(isArrayLike(arguments)).toBe(true);
        }

        fn2(0);
    });

    test('测试3', () => {
        let obj = {
            0: 'a',
            2: 'v',
            3: 'c',
            test: '',
            length: 3
        };
        expect(isArrayLike(obj)).toBe(true);
        expect(isArrayLike(obj, 1)).toBe(true);
        expect(isArrayLike(obj, 2)).toBe(false);

        obj = {
            0: 'a',
            1: 'one',
            2: 'v',
            length: 3
        };
        expect(isArrayLike(obj)).toBe(true);
        expect(isArrayLike(obj, 1)).toBe(true);
        expect(isArrayLike(obj, 2)).toBe(true);

        obj = {
            0: 'a',
            1: 'one',
            4294967296: 'v',
            length: 3
        };
        expect(isArrayLike(obj)).toBe(true);
        expect(isArrayLike(obj, 1)).toBe(false);
        expect(isArrayLike(obj, 2)).toBe(false);

        obj = {
            a: 0,
            one: 1,
            v: 2,
            length: 3
        };
        expect(isArrayLike(obj)).toBe(true);
        expect(isArrayLike(obj, 1)).toBe(false);
        expect(isArrayLike(obj, 2)).toBe(false);

        obj = {
            0: 'a',
            1: 'one',
            2: 'v',
            length: -3
        };
        expect(isArrayLike(obj)).toBe(false);
        expect(isArrayLike(obj, 1)).toBe(false);
        expect(isArrayLike(obj, 2)).toBe(false);

        obj = {
            0: 'a',
            1: 'one',
            2: 'v',
            name: 'obj',
            length: 3
        };
        expect(isArrayLike(obj)).toBe(true);
        expect(isArrayLike(obj, 1)).toBe(true);
        expect(isArrayLike(obj, 2)).toBe(false);

        const re = /regexp/;
        re.length = 1;
        re[0] = 'a';
        expect(isArrayLike(re)).toBe(true);
        expect(isArrayLike(re, 1)).toBe(true);
        expect(isArrayLike(re, 2)).toBe(true);
    });

    test('测试4', () => {
        let obj = {
            0: '0',
            2: '2',
            4: '4',
            length: 3
        };
        expect(isArrayLike(obj)).toBe(true);
        expect(isArrayLike(obj, 1)).toBe(true);
        expect(isArrayLike(obj, 2)).toBe(true);

        obj = {
            0: '0',
            2: '2',
            4: '4',
            value: 'test',
            length: 3
        };
        expect(isArrayLike(obj)).toBe(true);
        expect(isArrayLike(obj, 1)).toBe(true);
        expect(isArrayLike(obj, 2)).toBe(false);

        obj = {
            '0': '0',
            2: '2',
            '4': '4',
            length: 3
        };
        expect(isArrayLike(obj)).toBe(true);
        expect(isArrayLike(obj, 1)).toBe(true);
        expect(isArrayLike(obj, 2)).toBe(true);

        obj = {
            '0': '0',
            '2': '2',
            '4': '4',
            length: 3
        };
        expect(isArrayLike(obj)).toBe(true);
        expect(isArrayLike(obj, 1)).toBe(true);
        expect(isArrayLike(obj, 2)).toBe(true);

        obj = {
            '0': '0',
            '2': '2',
            '4': '4',
            value: 'test',
            length: 3
        };
        expect(isArrayLike(obj)).toBe(true);
        expect(isArrayLike(obj, 1)).toBe(true);
        expect(isArrayLike(obj, 2)).toBe(false);
    });
});
