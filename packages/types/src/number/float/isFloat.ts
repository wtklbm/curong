import { isFinite } from '..';

/**
 * 是不是一个浮点数，即不是整数的数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *
 * `JavaScript` 的 `Number` 类型是一个基于 `IEEE 754` 的 [双精度 64 位二进制格式](https://zh.wikipedia.org/wiki/雙精度浮點數) 值，类似于 `Java` 或者 `C#` 中的 `double`。
 * 这意味着它可以表示小数值，但是存储的数字的大小和精度有一些限制。
 *
 * ### 表示方法
 *
 * `IEEE 754` 双精度浮点数使用 `64` 位来表示 `3` 个部分：
 *  - 符号位 (`sign`) 占 `1` 个位，可以是正数也可以是负数
 *  - 指数位 (`exponent`) 占 `11` 位，指数是尾数应乘以的 `2` 的幂次，取值为 `-1022` 到 `1023`
 *  - 尾数位 (`mantissa`) 是 `52` 位，表示 `0` 和 `1` 之间的数值。尾数也称为**有效数**，是表示实际值 (有效数字) 的数值部分
 *
 * 尾数使用 `52` 位进行存储，在二进制小数中解释为 `1.…` 之后的数字。因此，尾数的精度是 `2^-52` (可以通过 [`Number.EPSILON`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON) 获得)，或者十进制数小数点后大约 `15` 到 `17` 位；超过这个精度的算术会受到[舍入](https://zh.wikipedia.org/wiki/浮点数#准确性)的影响。
 */
export default function isFloat(value: unknown): value is number {
    return isFinite(value) && value % 1 !== 0;
}
