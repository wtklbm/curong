import { isChinaMobilePhone } from '..';

describe('@curong/regexp/isChinaMobilePhone', () => {
    test('测试1', () => {
        for (const value of [
            '',
            ' ',
            110,
            120,
            10086,
            '180800300800',
            12345678,
            87654321,
            'abcdefghijk',
            12345678901,
            '12345678901'
        ]) {
            expect(isChinaMobilePhone(value)).toBe(false);
        }
    });

    test('测试2', () => {
        expect(isChinaMobilePhone('13812345678', 0)).toBe(true);
        expect(isChinaMobilePhone('+8613812345678', 0)).toBe(true);
        expect(isChinaMobilePhone('12345678901', 0)).toBe(true);
        expect(isChinaMobilePhone('13812345678', 1)).toBe(true);
        expect(isChinaMobilePhone('14712345678', 1)).toBe(true);
        expect(isChinaMobilePhone('15012345678', 1)).toBe(true);
        expect(isChinaMobilePhone('12345678901', 1)).toBe(false);
        expect(isChinaMobilePhone('13812345678', 2)).toBe(true);
        expect(isChinaMobilePhone('14512345678', 2)).toBe(true);
        expect(isChinaMobilePhone('14912345678', 2)).toBe(true);
    });

    test('测试3', () => {
        for (const value of [
            16080030080,
            18087030088,
            13907199856,
            '13591512420',
            19913769406,
            18512345657
        ]) {
            expect(isChinaMobilePhone(value)).toBe(true);
        }
    });
});
