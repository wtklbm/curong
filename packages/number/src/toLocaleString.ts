import { isFinite, isUintFilled } from '@curong/types';

import type { ToLocaleStringOptions } from './types';

/**
 * 将数字格式化为本地化字符串表示形式
 *
 * @param value 要格式化的数字
 * @param options 格式化选项
 *  - `separator`: 分隔符。默认为 `,`
 *  - `capacity`: 进制的间隔数。默认为 `3` (千进制)
 * @returns 返回格式化后的字符串
 * @throws
 *
 *  - 如果 `value` 不是一个有限数，则会抛出类型错误异常
 *  - 如果 `capacity` 不是一个无符号整数，则会抛出类型错误异常
 *
 * @example
 *
 * ```typescript
 * toLocaleString(123456789); // 123,456,789
 * toLocaleString(123456789, { separator: '_', capacity: 4 }); // 1_2345_6789
 * ```
 */
export default function toLocaleString(
    value: number,
    options: ToLocaleStringOptions
): string {
    if (!isFinite(value)) {
        throw new TypeError(`[toLocaleString] value 必须是一个有效的数字`);
    }

    const numStr = value.toString();
    const { separator, capacity } = { separator: ',', capacity: 3, ...options };

    if (!isUintFilled(capacity)) {
        throw new TypeError(
            `[toLocaleString] capacity 必须是一个大于 0 的整数`
        );
    }

    const [integerPart, decimalPart] = numStr.split('.');

    const regex = new RegExp(`\\B(?=(\\d{${capacity}})+(?!\\d))`, 'g');
    const integerWithCommas = integerPart.replace(regex, separator);

    return decimalPart
        ? `${integerWithCommas}.${decimalPart}`
        : integerWithCommas;
}
