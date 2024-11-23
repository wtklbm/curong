import { isEvery } from '@curong/types';

/**
 * 检查数组中所有元素是否满足给定条件
 *
 * @param value 要验证的值或值数组
 * @param predicate 要满足的条件或条件数组
 * @throws 如果所有元素都满足条件，则什么也不返回，否则会抛出类型异常
 */
export default function assertEvery<V, P extends (value: V) => boolean>(
    value: V | V[],
    predicate: P | P[]
): asserts value is V {
    if (!isEvery(value, predicate)) {
        throw new TypeError('[assertEvery] value 不满足给定的条件', {
            cause: { value, predicate }
        });
    }
}
