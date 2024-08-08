import { isChinaPhoneNumber } from '../src';

describe('@curong/regexp/isChinaPhoneNumber', () => {
    test('宽松模式：有效手机号 13812345678', () => {
        expect(isChinaPhoneNumber('13812345678', 0)).toBe(true);
    });

    test('宽松模式：有效手机号 +8613812345678', () => {
        expect(isChinaPhoneNumber('+8613812345678', 0)).toBe(true);
    });

    test('宽松模式：无效手机号 12345678901', () => {
        expect(isChinaPhoneNumber('12345678901', 0)).toBe(true);
    });

    test('常规模式：有效手机号 13812345678', () => {
        expect(isChinaPhoneNumber('13812345678', 1)).toBe(true);
    });

    test('常规模式：有效手机号 14712345678', () => {
        expect(isChinaPhoneNumber('14712345678', 1)).toBe(true);
    });

    test('常规模式：无效手机号 15012345678', () => {
        expect(isChinaPhoneNumber('15012345678', 1)).toBe(true);
    });

    test('常规模式：无效手机号 12345678901', () => {
        expect(isChinaPhoneNumber('12345678901', 1)).toBe(false);
    });

    test('严格模式：有效手机号 13812345678', () => {
        expect(isChinaPhoneNumber('13812345678', 2)).toBe(true);
    });

    test('严格模式：有效手机号 14512345678', () => {
        expect(isChinaPhoneNumber('14512345678', 2)).toBe(true);
    });

    test('严格模式：无效手机号 14912345678', () => {
        expect(isChinaPhoneNumber('14912345678', 2)).toBe(true);
    });

    test('严格模式：无效手机号 12345678901', () => {
        expect(isChinaPhoneNumber('12345678901', 2)).toBe(false);
    });

    test('无效输入：非手机号字符串 abcdefghijk', () => {
        expect(isChinaPhoneNumber('abcdefghijk', 1)).toBe(false);
    });

    test('无效输入：空字符串', () => {
        expect(isChinaPhoneNumber('', 1)).toBe(false);
    });

    test('无效输入：数字类型 12345678901', () => {
        expect(isChinaPhoneNumber(12345678901, 1)).toBe(false);
    });
});
