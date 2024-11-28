import { isHexString } from '..';

describe('@curong/types/isHexString', () => {
    test('测试1: 输入为有效的十六进制字符串，且以 "0x" 开头', () => {
        expect(isHexString('0x1a2b3c')).toBe(true);
    });

    test('测试2: 输入为有效的十六进制字符串，包含大写字母', () => {
        expect(isHexString('0xABCDEF')).toBe(true);
    });

    test('测试3: 输入为有效的十六进制字符串，包含小写字母和数字', () => {
        expect(isHexString('0xabc123')).toBe(true);
    });

    test('测试4: 输入为无效的十六进制字符串，包含非十六进制字符', () => {
        expect(isHexString('0x123g45')).toBe(false);
    });

    test('测试5: 输入为无效的字符串，不以 "0x" 开头', () => {
        expect(isHexString('abc123')).toBe(false);
    });

    test('测试6: 输入为非字符串类型，如数字', () => {
        expect(isHexString(123456)).toBe(false);
    });

    test('测试7: 输入为非字符串类型，如对象', () => {
        expect(isHexString({})).toBe(false);
    });

    test('测试8: 输入为空字符串', () => {
        expect(isHexString('')).toBe(false);
    });

    test('测试9: 输入为null', () => {
        expect(isHexString(null)).toBe(false);
    });

    test('测试10: 输入为undefined', () => {
        expect(isHexString(undefined)).toBe(false);
    });

    test('测试11: 输入为含有 "0x" 的无效字符串', () => {
        expect(isHexString('0xghijk')).toBe(false);
    });

    test('测试12: 输入为包含空格的无效十六进制字符串', () => {
        expect(isHexString('0x123 456')).toBe(false);
    });

    test('测试13: 测试不同模式下的结果', () => {
        expect(isHexString('1a2b3c', 0)).toBe(false);
        expect(isHexString('1a2b3c', 1)).toBe(true);
        expect(isHexString('1a2b3c', 2)).toBe(true);

        expect(isHexString('0x1a2b3c', 0)).toBe(true);
        expect(isHexString('0x1a2b3c', 1)).toBe(true);
        expect(isHexString('0x1a2b3c', 2)).toBe(false);
    });
});
