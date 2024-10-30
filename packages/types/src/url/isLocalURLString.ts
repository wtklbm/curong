import isURLString from './isURLString';

/**
 * 是不是一个 `localhost` URL 字符串
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
 * console.log(isURLString(12345)); // false
 * console.log(isURLString('not a url')); // false
 * console.log(isURLString('https://www.example.com')); // false
 * console.log(isURLString('http://localhost:1080')); // true
 * console.log(isURLString('https://127.0.0.1:8080')); // true
 * ```
 */
export default function isLocalURLString(value: unknown): value is string {
    return (
        isURLString(value) &&
        /^https?:\/\/(localhost|0|10|127|192(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1?\])/i.test(
            value.toString().trimStart()
        )
    );
}
