import { isNaN, isNumberValid, isZero } from '@curong/types';

import type { AmountInWordsOptions } from './types';

/* prettier-ignore */
const DIGIT_UNITS = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
const INTEGER_UNITS = ['', '拾', '佰', '仟'];
const PLACE_UNITS = ['', '万', '亿', '兆'];
const FRACTION_UNITS = ['角', '分', '厘', '毫'];
const MAX_INT_LENGTH = 14;
const MAX_DECIMAL_LENGTH = FRACTION_UNITS.length;

const isNilNumber = (value: number) => isZero(value) || isNaN(value);

/** 转换整数部分 */
const convertInteger = (amount: string): string => {
    const parts = amount.split('.');
    const integer = parts[0].replace('-', '');
    const integerNumbers = parseInt(integer) ? integer.split('').reverse() : [];

    if (integerNumbers.length > MAX_INT_LENGTH) {
        throw new TypeError(
            `[amountInWords] 最大数额只支持到兆，既小数点前最多${MAX_INT_LENGTH}位`
        );
    }

    const result: string[] = [];
    let last: number | null = null;

    for (let i = 0; i < integerNumbers.length; i += 4) {
        const chunk = integerNumbers.slice(i, i + 4);
        const chunkKey = i / 4;

        if (isNilNumber(parseInt(chunk.join('')))) {
            continue;
        }

        result.unshift(PLACE_UNITS[chunkKey] ?? '');

        for (const key in chunk) {
            const number = parseInt(chunk[key]);
            if (!number && (!last || key === '0')) {
                last = number;

                continue;
            }
            last = number;

            if (number) {
                result.unshift(INTEGER_UNITS[key] ?? '');
            }

            result.unshift(DIGIT_UNITS[number] ?? '');
        }
    }

    return result.join('');
};

/** 转换小数部分 */
const convertDecimal = (amount: string): string => {
    const result: string[] = [];
    const parts = amount.split('.');
    const integer = parseInt(parts[0].replace('-', ''));
    let decimal = parts[1] ?? '';

    if (isNilNumber(parseInt(decimal))) {
        decimal = '';
    }

    const decimalNumbers = decimal.split('');

    if (decimalNumbers.length > MAX_DECIMAL_LENGTH) {
        throw new TypeError(
            `[amountInWords] 最小数额只支持到毫，既小数点后最多${MAX_DECIMAL_LENGTH}位`
        );
    }

    const angle = parseInt(decimalNumbers.shift() ?? '');
    const dnl = decimalNumbers.filter(n => !!n).length;

    if (angle) {
        result.push(DIGIT_UNITS[angle], FRACTION_UNITS[0]);

        if (isZero(dnl)) {
            result.push('整');
        }
    } else if (dnl > 0 && integer) {
        result.push(DIGIT_UNITS[0]);
    }

    for (const key in decimalNumbers) {
        const number = decimalNumbers[key];

        if (number) {
            result.push(
                DIGIT_UNITS[parseInt(number)],
                FRACTION_UNITS[parseInt(key) + 1]
            );
        }
    }

    return result.join('');
};

/**
 * 将金额转换为中文大写的样式
 *
 * @param amount 要转换的金额。最大支持 `14` 位整数和 `4` 位小数
 * @param options 配置选项
 *  - `prefix`: 金额前缀。默认为 `人民币`
 *  - `negative`: 当金额为负时要显示的分隔字符。默认为 `负`
 * @returns 返回转换好的大写中文金额
 * @throws
 *  - 如果传递的值不是金额数字或金额字符串，则会抛出类型错误异常
 *  - 如果要转换的值的整数部分超过了 `14` 位整数，则会抛出类型错误异常
 *  - 如果要转换的值的小数部分超过了 `4` 位整数，则会抛出类型错误异常
 * @examples
 *
 * ```typescript
 * console.log(amountInWords(0)); // 零元整
 * console.log(amountInWords(23.05)); // 贰拾叁元零伍分
 * ```
 *
 * @note
 *
 * ### 规范
 *
 * 基于《会计基础工作规范》，此处总结性的罗列关键点:
 * - 所有以元为单位
 * - 汉字大写数字金额如：零、壹、贰、叁、肆、伍、陆、柒、捌、玖、拾、佰、仟、万、亿等
 * - 大写金额数字到元或者角为止的，在 `元` 或者 `角` 字之后应当写 `整` 字或者 `正` 字 (本项目使用 `整`)
 *   大写金额数字有分的，分字后面不写 `整` 或者 `正` 字
 * - 大写金额数字前未印有货币名称的，应当加填货币名称，即 `人民币`，货币名称与金额数字之间不得留有空白
 * - 阿拉伯金额数字中间有 `0` 时，汉字大写金额要写`零`字
 * - 阿拉伯数字金额中间连续有几个 `0` 时，汉字大写金额中可以只写一个 `零` 字
 *   阿拉伯金额数字元位是 `0`，或者数字中间连续有几个 `0`、元位也是 `0` 但角位不是 `0` 时，汉字大写金额可以只写一个 `零` 字，也可以不写 `零` 字
 */
export default function amountInWords(
    amount: string | number,
    options: AmountInWordsOptions = {}
): string {
    const { prefix = '', negative = '负' } = options;

    if (!isNumberValid(amount)) {
        throw new TypeError(
            `[amountInWords] amount 必须为有效的金额数字或字符串: ${amount}`
        );
    }

    amount = `${amount}`.trim();

    let integerResult = convertInteger(amount);
    const decimalResult = convertDecimal(amount);

    if (!integerResult && !decimalResult) {
        integerResult += DIGIT_UNITS[0];
    }

    if (integerResult) {
        integerResult += '元';
    }

    if (!decimalResult) {
        integerResult += '整';
    }

    if (amount.startsWith('-')) {
        integerResult = negative + integerResult;
    }

    return prefix + integerResult + decimalResult;
}
