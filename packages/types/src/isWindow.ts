/**
 * 是不是 `Window` 对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isWindow(value: unknown): value is Window {
    return value != null && value === (value as any).window;
}
