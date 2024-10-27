import isFunction from '../function/function/isFunction';
import isFunctionFilled from '../function/function/isFunctionFilled';
import isNullOrUndefined from '../nullable/isNullOrUndefined';

/**
 * 是不是一个 `React` 元素
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isReactElement(value: unknown): boolean {
    // https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
    const forF = isFunction(Symbol) && isFunctionFilled(Symbol.for);
    const symbol = forF ? Symbol.for('react.element') : 60103;

    return !isNullOrUndefined(value) && (value as any)['$$typeof'] === symbol;
}
