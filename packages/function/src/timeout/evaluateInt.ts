import { range } from '@curong/number';
import { isArray, isIntSafe, isObject } from '@curong/types';

type EvaluableIntValueSub =
    | number
    | string
    | { start?: number; end?: number }
    | (number | { start?: number; end?: number })[];

export type EvaluableIntValue =
    | EvaluableIntValueSub
    | (() => EvaluableIntValueSub);

/**
 * 计算传递的值，并得到一个整数
 *
 * @param value 可以传递多种值
 *  - 如果是一个整数，则直接返回该数
 *  - 如果是一个字符串，就会将其转换为数字
 *  - 如果是一个函数，则执行该函数，并获取结果
 *  - 如果是一个数组，则从数组中随机抽选一个元素，并计算得到结果
 *  - 如果是一个对象，则表示生成一个某范围内的数:
 *    - `start`: 开始时的数 (包含)，默认为 `0`
 *    - `end`: 结束时的数 (包含)，默认为 `0`
 * @returns 返回一个计算得到的整数
 * @throws
 *  - 如果传递的是一个数字，且数字不是一个安全的整数，则会抛出类型异常
 *  - 如果传递的值不是一个预期的类型，则会抛出类型异常
 */
export default function evaluateInt(value: EvaluableIntValue): number {
    switch (typeof value) {
        case 'number':
            if (!isIntSafe(value)) {
                throw new TypeError(
                    `[evaluateInt] 传递的参数不是一个安全的整数: ${value}`
                );
            }
            return value;

        case 'string':
            return evaluateInt(Number(value));

        case 'function':
            return evaluateInt((value as Function).call(value));

        case 'object':
            if (isArray(value)) {
                return evaluateInt(value[range(0, value.length - 1)]);
            }

            if (isObject<'start' | 'end', number>(value)) {
                const { start = 0, end = 0 } = value;
                const ret =
                    end === start
                        ? end
                        : start < end
                          ? range(end, start)
                          : range(start, end);

                if (!isIntSafe(ret)) {
                    throw new TypeError(
                        `[evaluateInt] 计算的结果不是一个安全的整数: ${ret}`
                    );
                }

                return ret;
            }

            break;
        default:
            break;
    }

    throw new TypeError(`[evaluateInt] 传递的参数不是预期的类型: ${value}`);
}
