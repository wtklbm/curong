import { isStringFilled } from '@curong/types';

import type { BytesUnit } from './types';

/**
 * 解析字节字符串并将其转换为数字表示的字节数
 *
 * @param value 字节字符串，格式应为 `<number> <unit>`，例如 "10 MB" 或 "500 kb"
 * @returns 返回解析后的字节数 (`Bytes`)
 * @throws 如果 `value` 不是 `<number> <unit>` 格式的字符串，否则会抛出异常
 * @note
 *  - 支持的单位包括：
 *    - `SI` (国际单位制，以 `1000` 为单位进位): B, KB, MB, GB, TB, PB, EB, ZB, YB
 *    - `IEC` (二进制单位，以 `1024` 为单位进位): KiB, MiB, GiB, TiB, PiB, EiB, ZiB, YiB
 *  - 单位不区分大小写，可以使用大写或小写字母
 * @usage
 *  - 在处理文件上传时，使用该函数来获取文件大小的字节数
 *  - 在显示存储容量时，将用户输入的字符串转换为字节数以进行计算
 *  - 在数据分析中，解析数据大小以便进行统计和比较
 *  - 在日志记录中，记录数据传输或存储的字节数，便于后续分析
 *
 * @example
 *
 * ```typescript
 * console.log(parseBytesSize('1 MiB')); // 1048576
 * console.log(parseBytesSize('1000 B')); // 1000
 * console.log(parseBytesSize('1.5 GB')); // 1500000000
 * console.log(parseBytesSize('1.5 GiB')); // 1610612736
 * console.log(parseBytesSize('500 kiB')); // 512000
 * ```
 */
export default function parseBytesSize(value: string): number;

/**
 * 解析字节字符串并将其转换为数字表示的字节数
 *
 * @param value 要处理的字节数或字节字符串
 * @param unit 要处理的单位，例如 `MB` 或 `kb`
 * @returns 返回解析后的字节数 (`Bytes`)
 * @note
 *  - 支持的单位包括：
 *    - `SI` (国际单位制，以 `1000` 为单位进位): B, KB, MB, GB, TB, PB, EB, ZB, YB
 *    - `IEC` (二进制单位，以 `1024` 为单位进位): KiB, MiB, GiB, TiB, PiB, EiB, ZiB, YiB
 *  - 单位不区分大小写，可以使用大写或小写字母
 * @usage
 *  - 在处理文件上传时，使用该函数来获取文件大小的字节数
 *  - 在显示存储容量时，将用户输入的字符串转换为字节数以进行计算
 *  - 在数据分析中，解析数据大小以便进行统计和比较
 *  - 在日志记录中，记录数据传输或存储的字节数，便于后续分析
 *
 * @example
 *
 * ```typescript
 * console.log(parseBytesSize('1', 'MiB')); // 1048576
 * console.log(parseBytesSize(1000, 'B')); // 1000
 * console.log(parseBytesSize('1.5', 'GB')); // 1500000000
 * console.log(parseBytesSize('1.5', 'GiB')); // 1610612736
 * console.log(parseBytesSize(500, 'kiB')); // 512000
 * ```
 */
export default function parseBytesSize(
    value: string | number,
    unit: BytesUnit
): number;

export default function parseBytesSize(
    value: string | number,
    unit?: BytesUnit
): number {
    value = `${value}`;

    const units: { [key: string]: number } = {
        b: 1,
        kb: 1000,
        mb: 1000 ** 2,
        gb: 1000 ** 3,
        tb: 1000 ** 4,
        pb: 1000 ** 5,
        eb: 1000 ** 6,
        zb: 1000 ** 7,
        yb: 1000 ** 8,
        kib: 1024,
        mib: 1024 ** 2,
        gib: 1024 ** 3,
        tib: 1024 ** 4,
        pib: 1024 ** 5,
        eib: 1024 ** 6,
        zib: 1024 ** 7,
        yib: 1024 ** 8
    };

    if (!isStringFilled(unit)) {
        const regex = /^([0-9]+(?:\.[0-9]+)?)\s*([KMGTPEZY]?i?B)$/i;
        const match = value.match(regex);

        if (!match) {
            throw new Error('[parseBytesSize] value 不是预期的类型', {
                cause: { value, unit }
            });
        }

        value = match[1];
        unit = match[2] as BytesUnit;
    }

    return parseFloat(value) * units[unit.toLowerCase()];
}
