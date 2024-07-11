import { setTimeout } from '..';

describe('@curong/function/setTimeout', () => {
    test('测试1', () => {
        expect(() => setTimeout(() => {}, NaN)).toThrow();
        expect(() => setTimeout(() => {}, Infinity)).toThrow();
        expect(() => setTimeout(() => {}, -Infinity)).toThrow();
        expect(() => setTimeout(() => {}, 1.5)).toThrow();
        expect(() =>
            setTimeout(
                () => {},
                () => 1.5
            )
        ).toThrow();
        expect(() => setTimeout(() => {}, 2147483648)).toThrow();
    });

    test('测试2', () => {
        let ret: any;
        const timer = setTimeout(() => {
            ret = true;
        }, 10);
        clearTimeout(timer);
        expect(ret).toBe(undefined);
    });

    test('测试3', () => {
        let ret: any;

        setTimeout(() => {
            ret = true;
        });

        setTimeout(() => {
            expect(ret).toBe(true);
        }, 20);

        expect(ret).toBe(undefined);
    });
});
