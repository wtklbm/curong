import { amountInWords } from '..';

describe('@curong/number/amountInWords', () => {
    test('测试1', () => {
        expect(() => amountInWords('数字')).toThrow();
        expect(() => amountInWords(1.99999e14)).toThrow();
        expect(() => amountInWords(1.343453534534)).toThrow();
    });

    test('测试2', () => {
        expect(amountInWords(0)).toBe('零元整');
        expect(amountInWords(0.07)).toBe('柒分');
        expect(amountInWords(-20)).toBe('负贰拾元整');
        expect(amountInWords(0)).toBe('零元整');
        expect(amountInWords(1002)).toBe('壹仟零贰元整');
        expect(amountInWords(110)).toBe('壹佰壹拾元整');
        expect(amountInWords(1.5)).toBe('壹元伍角整');
        expect(amountInWords(23.05)).toBe('贰拾叁元零伍分');
        expect(amountInWords(0.5512)).toBe('伍角伍分壹厘贰毫');
        expect(amountInWords(123456789.01)).toBe(
            '壹亿贰仟叁佰肆拾伍万陆仟柒佰捌拾玖元零壹分'
        );
        expect(amountInWords(65535)).toBe('陆万伍仟伍佰叁拾伍元整');
        expect(amountInWords(1.99999e13)).toBe('壹拾玖兆玖仟玖佰玖拾玖亿元整');
    });
});
