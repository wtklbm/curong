import getTag from './getTag';

/**
 * 是不是一个 `DataView`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @info `DataView` 是一个可以从二进制 `ArrayBuffer` 对象中读写多种数值类型的底层接口，使用它时，不用考虑不同平台的字节序问题。它是一个二进制字节缓存区。
 */
export default function isDataView(value: any): value is DataView {
    return getTag(value) === 'DataView';
}
