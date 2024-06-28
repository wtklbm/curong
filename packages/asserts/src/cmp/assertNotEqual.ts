import { isNotEqual } from '@curong/types';

/**
 * **简单** 的判断多个的值是否不相等
 *
 * 基本类型会比较值是否相等，引用类型会比较引用是否相等。
 *
 * @param value 当前值
 * @param args 要跟当前值比较的多个值
 * @throws 如果不相等则什么也不返回，否则会抛出类型异常
 */
export default function assertNotEqual<T extends unknown[]>(
    value: unknown,
    ...args: T
) {
    if (!isNotEqual(value, args)) {
        throw new TypeError(`[assertEqual] ${value} 与 ${args} 中的某些值相等`);
    }
}
