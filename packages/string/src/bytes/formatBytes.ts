/**
 * 将字节数格式化为更易读的字符串表示形式，支持 `SI` 或 `IEC` 单位制，并允许指定小数位数
 *
 * `formatBytes` 函数用于将字节数转换为更具可读性的字符串表示形式。用户可以选择使用 `SI`（千进制）或 `IEC`（二进制）单位，并通过 `dp` 参数指定小数点后保留的位数
 *
 * @param bytes 需要格式化的字节数
 * @param si 是否使用 `SI` 单位（千进制）。默认为 `true`
 * @param dp 小数点后的保留位数 (四舍五入)。默认为 `1`
 * @returns 格式化后的字符串，包含适当的单位（如 `KB`, `MB`, `GB` 等）
 *
 * @example
 * ```typescript
 * console.log(formatBytes(1024)); // 1.0 KiB
 * console.log(formatBytes(1024, true)); // 1.0 KB
 * console.log(formatBytes(1048576)); // 1.0 MiB
 * console.log(formatBytes(1048576, false, 2)); // 1.00 MiB
 * ```
 */
export default function formatBytes(bytes: number, si = true, dp = 1) {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }

    const units = si
        ? ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (
        Math.round(Math.abs(bytes) * r) / r >= thresh &&
        u < units.length - 1
    );

    return bytes.toFixed(dp) + ' ' + units[u];
}
