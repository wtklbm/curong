import type { IsAny } from './IsAny';
import { IsNever } from './IsNever';

/**
 * 是不是一个 `unknown` 类型的值
 *
 * @typeParam T 要验证的值
 * @example
 *
 * ```typescript
 * IsUnknown<unknown> = true
 * IsUnknown<1> = false
 * IsUnknown<string> = false
 * ```
 * @returns 是则返回 `true`，否则为 `false`
 */
export type IsUnknown<T> =
    IsNever<T> extends false
        ? T extends unknown
            ? unknown extends T
                ? IsAny<T> extends false
                    ? true
                    : false
                : false
            : false
        : false;
