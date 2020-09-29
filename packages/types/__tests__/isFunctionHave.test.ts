// @ts-nocheck
import { isFunctionHave } from '../src';

describe('@curong/types/isFunctionHave', () => {
    test('测试1', () => {
        expect(isFunctionHave(12)).toBe(false);
    });

    test('测试2', () => {
        function xx(a: any, b: any) {
            return a + b;
        }

        expect(isFunctionHave(xx)).toBe(true);
    });

    test('测试3', () => {
        function xx() {}
        expect(isFunctionHave(xx)).toBe(false);
    });
});
