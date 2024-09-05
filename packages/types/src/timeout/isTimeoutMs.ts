import isUint from '../number/int/isUint';

/**
 * 是不是一个超时时间毫秒数
 *
 * 浏览器内部将延迟存储为 `32` 位有符号整数 (一位用于符号位，数字部分为 `2^31-1`)
 * 当使用大于 `2147483647` 毫秒（约 `24.8` 天）的延迟时，这会导致整数溢出
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isTimeoutMs(value: unknown): value is number {
    return isUint(value) && value <= 2147483647;
}
