import getTag from './getTag';

/**
 * 是不是一个 `File` 对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @info `File` 提供了有关文件的信息，并允许网页中的 `JavaScript` 访问其内容。
 * 一般在使用 `<input>` 标签时会涉及到 `File` 对象。
 *
 * 通常情况下， `File` 对象是来自用户在一个 `<input>` 元素上选择文件后返回的 `FileList` 对象，
 * 也可以是来自由拖放操作生成的 `DataTransfer` 对象，或者来自 `HTMLCanvasElement` 上的 `mozGetAsFile() API`。
 * 在 `Gecko` 中，特权代码可以创建代表任何本地文件的 `File` 对象，而无需用户交互。
 *
 * `File` 对象是特殊类型的 `Blob`，且可以用在任意的 `Blob` 类型的 `context` 中。
 * 比如说， `FileReader`, `URL.createObjectURL()`, `createImageBitmap()`, 及 `XMLHttpRequest.send()` 都能处理 `Blob` 和 `File`。
 */
export default function isFile(value: any): value is File {
    return getTag(value) === 'File';
}
