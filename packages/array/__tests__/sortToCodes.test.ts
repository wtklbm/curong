import { sortToCodes } from '../src';

describe('@curong/array/sortToCodes', () => {
    test('测试1', () => {
        // @ts-ignore
        expect(() => sortToCodes()).toThrow();
        expect(sortToCodes([]).length).toBe(0);
    });

    test('测试2', () => {
        const arr = ['this is a test.', 'omg', 'hello world.', 'very good'];
        const ret = sortToCodes(arr);
        expect(ret).toEqual([1, 3, 2, 0]);
    });

    test('测试3', () => {
        const arr = ['this is a test.', 'omg', 'hello world.', 'ogm'];
        const ret = sortToCodes(arr);
        expect(ret).toEqual([1, 3, 2, 0]);
    });

    test('测试4', () => {
        const arr = ['this is a test.', 'this is a test.', 'this is a test.'];
        const ret = sortToCodes(arr);
        expect(ret).toEqual([0, 1, 2]);
    });
});
