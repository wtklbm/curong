import { getTagEqual } from '..';

/**
 * 是不是一个 `Float64Array`，每一项占八个字节，值为 `-1.8e308 - 1.8e308`，并且 `5e-324` 是最小的正数
 *
 * - 使用 `IEEE 754` 浮点格式存储数字，`Float64Array` 将 `52` 位用于尾数，以及 `11` 位用于指数
 * - `JavaScript` 数字默认使用双精度浮点格式，这与 `Float64Array` 相同
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isFloat64Array(value: unknown): value is Float64Array {
    return getTagEqual(value, 'Float64Array');
}
