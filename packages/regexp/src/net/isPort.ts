import { isUint16 } from '@curong/types';

/**
 * 是不是一个端口号，即 `0` 到 `65535` 之间的正整数
 *
 * @param value 要检测的值
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 * ```typescript
 * console.log(isPort('0')); // true
 * console.log(isPort(8080)); // true
 * console.log(isPort('65535')); // true
 * console.log(isPort('65536')); // false
 * ```
 *
 * @note
 *  - 该函数调用了 `isUint16` 来确保 `value` 是一个在 0 到 65535 范围内的无符号整数。
 *  - `value` 需要是一个有效的字符串表示数字，且不包含其他非数字字符。
 *  - 端口号的有效范围为 `0` 到 `65535`，包括边界值。
 *  - 如果 `value` 超出该范围或包含无效字符，函数会返回 `false`。
 */
export default function isPort(value: string | number): boolean {
    return isUint16(+value) && `${value}`.trim() === `${value}`;
}
