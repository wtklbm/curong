import { reach } from '../src';

describe('@curong/function/reach', () => {
    test('测试1', () => {
        let r = reach(3, () => 10);
        let ret = r();
        ret = r();
        ret = r();

        expect(ret).toBe(10);
    });

    test('测试2', () => {
        let r = reach(3, () => 10);

        expect(r()()()).toBe(10);
    });

    test('测试3', () => {
        let r = reach(3, () => 10);
        let ret = r();
        ret = r()();

        expect(ret).toBe(10);
    });

    test('测试4', () => {
        let r = reach(3, () => 10);
        let ret = r()();
        ret = r();

        expect(ret).toBe(10);
    });

    test('测试5', () => {
        expect(() => reach(3.1, () => 1)).toThrow();
        expect(() => reach(-3.1, () => 1)).toThrow();
    });

    test('测试6', () => {
        expect(reach(0, () => 1)()).toBe(1);
    });
});
