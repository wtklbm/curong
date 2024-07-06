import { rangeSafe } from '../src';

describe('@curong/number/rangeSafe', () => {
    test('测试1', () => {
        // @ts-ignore
        expect(() => rangeSafe('0', 1)).toThrow();
        // @ts-ignore
        expect(() => rangeSafe('0', '1')).toThrow();
        // @ts-ignore
        expect(() => rangeSafe(0, '1')).toThrow();
        expect(() => rangeSafe(NaN, 1)).toThrow();
        expect(() => rangeSafe(1, NaN)).toThrow();
        expect(() => rangeSafe(1, Infinity)).toThrow();
        expect(() => rangeSafe(Infinity, 1)).toThrow();
        expect(() => rangeSafe(Infinity, -Infinity)).toThrow();
        expect(() => rangeSafe(-Infinity, Infinity)).toThrow();
        expect(() => rangeSafe(0, 2.1)).toThrow();
        expect(() => rangeSafe(1.1, 2.1)).toThrow();
        expect(() => rangeSafe(1.1, 2)).toThrow();
    });

    test('测试2', () => {
        let ret;
        ret = rangeSafe(5, 10);

        expect(ret >= 5 && ret <= 10).toBe(true);

        ret = rangeSafe(10, 10);
        expect(ret).toBe(10);

        ret = rangeSafe(0, 10);
        expect(ret >= 0 && ret <= 10).toBe(true);

        ret = rangeSafe(-1, 10);
        expect(ret >= -1 && ret <= 10).toBe(true);

        ret = rangeSafe(11, 10);
        expect(ret >= 10 && ret <= 11).toBe(true);

        ret = rangeSafe(1, 2);
        expect(ret >= 1 && ret <= 2).toBe(true);
    });
});
