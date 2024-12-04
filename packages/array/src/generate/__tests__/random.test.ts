import { random } from '..';

describe('@curong/array/random', () => {
    test('测试1: 从数组中随机挑选一个元素，使用 Math.random', () => {
        const arr = ['a', 'b', 'c', 'd', 'e'];
        const result = random(arr);
        expect(result.every(v => arr.includes(v))).toBe(true);
    });

    test('测试2: 从数组中随机挑选多个元素，使用 Math.random', () => {
        const arr = ['a', 'b', 'c', 'd', 'e'];
        const result = random(arr, { length: 3 });
        expect(result.length).toBe(3);
        result.forEach(item => {
            expect(arr).toContain(item);
        });
    });

    test('测试3: 从数组中随机挑选多个元素，使用 crypto.getRandomValues', () => {
        const arr = ['a', 'b', 'c', 'd', 'e'];
        const result = random(arr, { length: 3, isSafe: true });
        expect(result.length).toBe(3);
        expect(result.every(v => arr.includes(v))).toBe(true);
    });

    test('测试4: 从数组中随机挑选一个元素，禁止重复，使用 Math.random', () => {
        const arr = ['a', 'b', 'c', 'd', 'e'];
        const result = random(arr, { length: 1, isRepeat: false });
        expect(result.length).toBe(1);
        expect(result.every(v => arr.includes(v))).toBe(true);
    });

    test('测试5: 从数组中随机挑选多个元素，禁止重复，使用 Math.random', () => {
        const arr = ['a', 'b', 'c', 'd', 'e'];
        const result = random(arr, { length: 3, isRepeat: false });
        expect(result.length).toBe(3);
        expect(result.every(v => arr.includes(v))).toBe(true);
        expect(new Set(result).size).toBe(result.length);
    });

    test('测试6: 传入空数组，返回空数组', () => {
        const arr: string[] = [];
        const result = random(arr);
        expect(result).toEqual([]);
    });

    test('测试7: length 为 0，返回空数组', () => {
        const arr = ['a', 'b', 'c'];
        const result = random(arr, { length: 0 });
        expect(result).toEqual([]);
    });

    test('测试8: 传入 invalid length 参数，抛出异常', () => {
        const arr = ['a', 'b', 'c'];
        expect(() => random(arr, { length: -1 })).toThrow(TypeError);
    });

    test('测试9: length 超过数组长度，返回数组长度个随机元素', () => {
        const arr = ['a', 'b', 'c', 'd', 'e'];
        const result = random(arr, { length: 10 });
        expect(result.length).toBe(arr.length);
    });

    test('测试10: 返回安全随机值，使用 crypto.getRandomValues', () => {
        const arr = ['a', 'b', 'c', 'd', 'e'];
        const result = random(arr, { length: 2, isSafe: true });
        expect(result.length).toBe(2);
        expect(result.every(v => arr.includes(v))).toBe(true);
    });
});
