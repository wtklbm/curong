import isFunction from './isFunction';
import isObject from './isObject';
import isPlainObject from './isPlainObject';
import isString from './isString';

const DOM_PROPERTIES_TO_CHECK: Array<keyof HTMLElement> = [
    'attributes',
    'innerHTML',
    'nodeValue',
    'ownerDocument',
    'style'
];

/**
 * 是不是一个 `HTMLElement`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isHTMLElement(value: unknown): value is HTMLElement {
    try {
        return (
            isObject(value) &&
            !isPlainObject(value) &&
            (value as HTMLElement).nodeType === 1 &&
            isString((value as HTMLElement).nodeName) &&
            DOM_PROPERTIES_TO_CHECK.every(p => p in value) &&
            isFunction(
                // @ts-ignore
                (value as HTMLElement).ownerDocument.defaultView.HTMLElement
            )
        );
    } catch {}

    return false;
}
