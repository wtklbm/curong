import { isSome } from '@curong/types';

/**
 * 检查数组中是否至少有一个元素满足给定的条件
 *
 * @param value 要验证的值或值数组
 * @param predicate 要满足的条件或条件数组
 * @throws 如果至少有一个元素满足条件，则什么也不返回，否则会抛出类型异常
 */
export default function assertSome<V, P extends (value: V) => boolean>(
    value: V | V[],
    predicate: P | P[]
): asserts value is V {
    if (!isSome(value, predicate)) {
        throw new TypeError(
            `[assertSome] ${value} 不满足给定的条件: ${predicate}`
        );
    }
}
