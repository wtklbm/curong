import { isFinite, isUintFilled } from '@curong/types';

import type { WithDelimiterOptions } from './types';

/**
 * 将数字或数字字符串格式化为带有分隔符的样式
 *
 * @param value 要格式化的数字
 * @param options 格式化选项
 *  - `delimiter`: 分隔符。默认为 `,`
 *  - `capacity`: 进制的间隔数。默认为 `3` (千进制)
 * @returns 返回格式化后的字符串
 * @throws
 *  - 如果 `value` 不是一个有限数，则会抛出类型错误异常
 *  - 如果 `capacity` 不是一个大于 0 的无符号整数，则会抛出类型错误异常
 * @example
 *
 * ```typescript
 * withDelimiter(123456789); // 123,456,789
 * withDelimiter(123456789, { delimiter: '_', capacity: 4 }); // 1_2345_6789
 * ```
 */
export default function withDelimiter(
    value: number | string,
    options?: WithDelimiterOptions
): string {
    if (!isFinite(+value)) {
        throw new TypeError('[withDelimiter] value 必须是一个有效的数字', {
            cause: { value, options }
        });
    }

    const numStr = value.toString();
    const { delimiter, capacity } = { delimiter: ',', capacity: 3, ...options };

    if (!isUintFilled(capacity)) {
        throw new TypeError(
            '[withDelimiter] capacity 必须是一个大于 0 的整数',
            {
                cause: { value, options, capacity }
            }
        );
    }

    const [integerPart, decimalPart] = numStr.split('.');

    const regex = new RegExp(`\\B(?=(\\d{${capacity}})+(?!\\d))`, 'g');
    const integerWithCommas = integerPart.replace(regex, delimiter);

    return decimalPart
        ? `${integerWithCommas}.${decimalPart}`
        : integerWithCommas;
}
