import { isPrimeNumber } from '..';

describe('@curong/types/isPrimeNumber', () => {
    test('2 是质数', () => {
        expect(isPrimeNumber(2)).toBe(true);
    });

    test('3 是质数', () => {
        expect(isPrimeNumber(3)).toBe(true);
    });

    test('4 不是质数', () => {
        expect(isPrimeNumber(4)).toBe(false);
    });

    test('5 是质数', () => {
        expect(isPrimeNumber(5)).toBe(true);
    });

    test('6 不是质数', () => {
        expect(isPrimeNumber(6)).toBe(false);
    });

    test('质数边界测试：17 是质数', () => {
        expect(isPrimeNumber(17)).toBe(true);
    });

    test('非质数边界测试：18 不是质数', () => {
        expect(isPrimeNumber(18)).toBe(false);
    });

    test('1 不是质数', () => {
        expect(isPrimeNumber(1)).toBe(false);
    });

    test('0 不是质数', () => {
        expect(isPrimeNumber(0)).toBe(false);
    });

    test('负数不是质数', () => {
        expect(isPrimeNumber(-5)).toBe(false);
    });

    test('大质数测试：97 是质数', () => {
        expect(isPrimeNumber(97)).toBe(true);
    });

    test('大非质数测试：100 不是质数', () => {
        expect(isPrimeNumber(100)).toBe(false);
    });
});
