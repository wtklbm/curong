/**
 * 是不是一个 `Event` 事件
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isEvent(value: unknown): value is Event {
    return typeof Event === 'function' && value instanceof Event;
}
