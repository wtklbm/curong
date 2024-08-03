import { once } from '..';

describe('@curong/function/once', () => {
    test('测试1', async () => {
        let x = 0;
        const add = (a: number, b: number) => {
            const r = a + b;
            x += r;
            return r;
        };

        const n = once(add);
        expect(n(1, 2)).toBe(3);
        expect(n(2, 2)).toBe(3);
        expect(n(3, 2)).toBe(3);
        expect(n(4, 2)).toBe(3);
        expect(x).toBe(3);
    });

    test('测试2', async () => {
        let x = 0;
        const add = (a: number, b: number) => {
            const r = a + b;
            x += r;
            return r;
        };

        const s = once(add, 1, 2);
        expect(s()).toBe(3);
        expect(s()).toBe(3);
        expect(s()).toBe(3);
        expect(s()).toBe(3);
        expect(x).toBe(3);
    });
});
