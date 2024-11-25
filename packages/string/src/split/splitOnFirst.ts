/**
 * 在字符串中查找并分割第一个出现的分隔符，将字符串分割成两部分
 *
 * 该函数将输入字符串 `value` 从第一个匹配的分隔符 `separator` 处分割成两部分，返回一个包含两个部分的数组。
 * 如果没有找到分隔符，或者输入的 `value` 或 `separator` 为空字符串，或者 `value` 与 `separator` 完全相同，则返回一个空数组。
 *
 * @param value 需要分割的字符串
 * @param separator 用于分割的分隔符
 * @returns 如果成功分割，返回一个包含两部分的数组 `[前半部分, 后半部分]`；否则返回空数组
 *  - 如果 `value` 或 `separator` 是空字符串，函数也会返回空数组
 *  - 如果 `value` 和 `separator` 完全相同，函数也返回空数组
 *  - 如果 `separator` 在 `value` 中不存在，函数返回空数组
 * @example
 * ```typescript
 * console.log(splitOnFirst('hello world', ' ')); // ['hello', 'world']
 * console.log(splitOnFirst('hello, world!', ',')); // ['hello', ' world!']
 * console.log(splitOnFirst('hello', 'o')); // ['hell', '']
 * console.log(splitOnFirst('hello', 'x')); // []
 * console.log(splitOnFirst('hello', '')); // []
 * ```
 * @note
 *  - 该函数仅分割第一个出现的 `separator`，如果 `separator` 在字符串中出现多次，只会在第一次出现的地方进行分割。
 */
export default function splitOnFirst(value: '', separator: string): [];

export default function splitOnFirst(value: string, separator: ''): [];

export default function splitOnFirst(value: '', separator: ''): [];

export default function splitOnFirst(
    value: string,
    separator: string
): [] | [string, string];

export default function splitOnFirst(
    value: string,
    separator: string
): [] | [string, string] {
    if (!value.length || !separator.length || value === separator) {
        return [];
    }

    const separatorIndex = value.indexOf(separator);

    if (separatorIndex === -1) {
        return [];
    }

    return [
        value.slice(0, separatorIndex),
        value.slice(separatorIndex + separator.length)
    ];
}
