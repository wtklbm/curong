import { isBinaryString } from '..';

describe('@curong/types/isBinaryString', () => {
    test('测试1: 输入为有效的二进制字符串，且以 "0b" 开头', () => {
        expect(isBinaryString('0b101010')).toBe(true);
    });

    test('测试2: 输入为有效的二进制字符串，且以 "0b" 开头，包含多个 1 和 0', () => {
        expect(isBinaryString('0b110010101011')).toBe(true);
    });

    test('测试3: 输入为无效的二进制字符串，且以 "0b" 开头，但包含非二进制字符', () => {
        expect(isBinaryString('0b102010')).toBe(false);
    });

    test('测试4: 输入为无效的字符串，不以 "0b" 开头', () => {
        expect(isBinaryString('1101010101')).toBe(false);
    });

    test('测试5: 输入为非字符串类型，如数字', () => {
        expect(isBinaryString(101010)).toBe(false);
    });

    test('测试6: 输入为非字符串类型，如对象', () => {
        expect(isBinaryString({})).toBe(false);
    });

    test('测试7: 输入为空字符串', () => {
        expect(isBinaryString('')).toBe(false);
    });

    test('测试8: 输入为null', () => {
        expect(isBinaryString(null)).toBe(false);
    });

    test('测试9: 输入为undefined', () => {
        expect(isBinaryString(undefined)).toBe(false);
    });

    test('测试10: 输入为含有 "0b" 的无效字符串', () => {
        expect(isBinaryString('0babc')).toBe(false);
    });

    test('测试11: 输入为有效的二进制字符串，含有不同的字母或符号', () => {
        expect(isBinaryString('0b1010a10')).toBe(false);
    });

    test('测试12: 输入为包含空格的无效二进制字符串', () => {
        expect(isBinaryString('0b 1010 1010')).toBe(false);
    });
});
