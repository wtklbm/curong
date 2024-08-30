import { range } from '../src';

describe('@curong/array/range', () => {
    test('测试1', () => {
        expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
    });

    test('测试2', () => {
        expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8, 10]);
    });

    test('测试3', () => {
        expect(range(5, 1, -1)).toEqual([5, 4, 3, 2, 1]);
    });

    test('测试4', () => {
        expect(() => range(5, 1, 2)).toThrow();
        expect(() => range(5, 1, 0)).toThrow();
        expect(range(5, 1, -2)).toEqual([5, 3, 1]);

        expect(() => range(1, 5, -2)).toThrow();
        expect(() => range(1, 5, 0)).toThrow();
        expect(range(1, 5, 2)).toEqual([1, 3, 5]);
        expect(range(1, 5, 0.5)).toEqual([1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]);
    });

    test('测试5', () => {
        expect(range(0, 0)).toEqual([0]);
        expect(range(0.1, 0.5)).toEqual([0.1]);
        expect(range(0.1, 0.5, 0.1)).toEqual([
            0.1, 0.2, 0.30000000000000004, 0.4, 0.5
        ]);
    });
});
