import getTagEqual from '../type/getTagEqual';

/**
 * 是不是一个 `FileReader` 对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isFileReader(value: unknown): value is FileReader {
    return getTagEqual(value, 'FileReader');
}
