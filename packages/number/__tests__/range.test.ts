import { range } from '../src';

describe('@curong/number/range', () => {
    test('测试1', () => {
        // @ts-ignore
        expect(() => range('0', 1)).toThrow();
        // @ts-ignore
        expect(() => range('0', '1')).toThrow();
        // @ts-ignore
        expect(() => range(0, '1')).toThrow();
        expect(() => range(NaN, 1)).toThrow();
        expect(() => range(1, NaN)).toThrow();
        expect(() => range(1, Infinity)).toThrow();
        expect(() => range(Infinity, 1)).toThrow();
        expect(() => range(Infinity, -Infinity)).toThrow();
        expect(() => range(-Infinity, Infinity)).toThrow();
        expect(() => range(0, 2.1)).toThrow();
        expect(() => range(1.1, 2.1)).toThrow();
        expect(() => range(1.1, 2)).toThrow();
    });

    test('测试2', () => {
        let ret;
        ret = range(5, 10);

        expect(ret >= 5 && ret <= 10).toBe(true);

        ret = range(10, 10);
        expect(ret).toBe(10);

        ret = range(0, 10);
        expect(ret >= 0 && ret <= 10).toBe(true);

        ret = range(-1, 10);
        expect(ret >= -1 && ret <= 10).toBe(true);

        ret = range(11, 10);
        expect(ret >= 10 && ret <= 11).toBe(true);

        ret = range(1, 2);
        expect(ret >= 1 && ret <= 2).toBe(true);
    });
});
