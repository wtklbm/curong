import codePointAt from '../character/codePointAt';

/**
 * 将 `UTF-8` 字符串转换为字节数组
 *
 * 如果需要转换为 `buffer`，请调用 `new Uint8Array(bytesArray('')).buffer`。
 *
 * @param value 要转换的字符串
 * @returns 返回转换好的字节数组
 * @example
 *
 * ```typescript
 * const ret = bytesArray('中国');
 * console.log(ret); // [ 228, 184, 173, 229, 155, 189 ]
 * ```
 */
export default function bytesArray(value: string): number[] {
    const buffers = [];

    for (let point = 0, next = 0, i = 0, len = value.length; i < len; i++) {
        point = codePointAt(value, i)!;

        if (point >= 0xd800 && point <= 0xdbff) {
            next = codePointAt(value, i)!;

            if (next >= 0xdc00 && next <= 0xdfff) {
                point = (point - 0xd800) * 0x400 + next - 0xdc00 + 0x10000;
                i++;

                if (point > 0xffff) {
                    buffers.push(
                        (0x1e << 3) | (point >>> 18),
                        (0x2 << 6) | ((point >>> 12) & 0x3f),
                        (0x2 << 6) | ((point >>> 6) & 0x3f),
                        (0x2 << 6) | (point & 0x3f)
                    );

                    continue;
                }
            } else {
                buffers.push(0xef, 0xbf, 0xbd);
                continue;
            }
        }

        if (point <= 0x007f) {
            buffers.push((0x0 << 7) | point);
        } else if (point <= 0x07ff) {
            buffers.push(
                (0x6 << 5) | (point >>> 6),
                (0x2 << 6) | (point & 0x3f)
            );
        } else {
            buffers.push(
                (0xe << 4) | (point >>> 12),
                (0x2 << 6) | ((point >>> 6) & 0x3f),
                (0x2 << 6) | (point & 0x3f)
            );
        }
    }

    return buffers;
}
