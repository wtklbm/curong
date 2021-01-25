import { sortToIndexes } from '../src';

describe('@curong/array/sortToIndexes', () => {
    test('测试1', () => {
        expect(sortToIndexes([]).length).toBe(0);
    });

    test('测试2', () => {
        const arr = ['this is a test.', 'omg', 'hello world.', 'very good'];
        const ret = sortToIndexes(arr);
        expect(ret).toEqual([1, 3, 2, 0]);
    });

    test('测试3', () => {
        const arr = ['this is a test.', 'omg', 'hello world.', 'ogm'];
        const ret = sortToIndexes(arr);
        expect(ret).toEqual([1, 3, 2, 0]);
    });

    test('测试4', () => {
        const arr = ['this is a test.', 'this is a test.', 'this is a test.'];
        const ret = sortToIndexes(arr);
        expect(ret).toEqual([0, 1, 2]);
    });
});
