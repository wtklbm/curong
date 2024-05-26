import getTagEqual from './getTagEqual';

/**
 * 是不是一个 `FileList` 对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isFileList(value: unknown): value is FileList {
    return getTagEqual(value, 'FileList');
}
