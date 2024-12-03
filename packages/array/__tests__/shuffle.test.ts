import { shuffle } from '../src';

describe('@curong/array/shuffle', () => {
    test('测试1', () => {
        expect(shuffle([]).length).toBe(0);
    });

    test('测试2', () => {
        const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        const ret = shuffle(arr);
        expect(ret.length).toBe(10);
        expect(ret.every(Boolean)).toBe(true);
    });

    test('测试3', () => {
        const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        const ret = shuffle(arr, true);
        expect(ret.length).toBe(10);
        expect(ret.every(Boolean)).toBe(true);
    });

    test('测试4', () => {
        const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        const ret = shuffle(arr, false);
        expect(ret.length).toBe(10);
        expect(ret.every(Boolean)).toBe(true);
    });
});
