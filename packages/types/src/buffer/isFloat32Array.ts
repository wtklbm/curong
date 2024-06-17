import { getTagEqual } from '..';

/**
 * 是不是一个 `Float32Array`，每一项占四个字节，值为 `-3.4028234663852886e38 - 3.4028234663852886e38`，并且 `1.2e-38` 是最小的正数
 *
 * - 使用 `IEEE 754` 浮点格式存储数字，`Float32Array` 将 `23` 位用于尾数，以及 `8` 位用于指数
 * - 在 `Javascript` 中能够表示的最大值是 `3.4028234663852886e38`，通常简写为 `3.4e38`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isFloat32Array(value: unknown): value is Float32Array {
    return getTagEqual(value, 'Float32Array');
}
