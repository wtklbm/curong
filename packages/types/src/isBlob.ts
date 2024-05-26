import getTagEqual from './getTagEqual';

/**
 * 是不是一个 `Blob`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @info `Blob` 是不可变的原始数据的类似文件的对象，
 * 可以被读取为文本或二进制数据，也可以转换为 `ReadableStream`
 */
export default function isBlob(value: unknown): value is Blob {
    return getTagEqual(value, 'Blob');
}
