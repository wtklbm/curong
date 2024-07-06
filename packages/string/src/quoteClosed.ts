/**
 * `简单` 的判断 `代码字符串` 在指定的符号之后是否含有未闭合的引号
 *
 * @note 该方法并不严谨，仅仅是判断一小段字符串，
 *       所以该函数的返回结果仅仅作为参考，并不能作为绝对的依据。
 *
 * @note 该函数是从右向左依次遍历的，并且检测到以下字符后会自动中断遍历并返回结果。
 *
 *       中断遍历的情况 (引号之外的):
 *         - `{`、`}`、`;`、`(`、`)`、`[`、`]`
 *
 * @param str 要检查的字符串
 *
 * @returns 如果引号完全闭合则返回空字符串，否则返回从后向前找到的第一个未闭合的单个引号
 * @example
 *
 * ```typescript
 * const ret = quoteClosed('"xxx"}"');
 * console.log(ret); // '"'
 * ```
 */
export default function quoteClosed(str: string) {
    let token: string = '';

    // 判断是不是英文单词后面的 `'`
    const word = /^[a-zA-Z]'[a-zA-Z]{1,2} /;

    for (let i = str.length - 1; i >= 0; i--) {
        const char: string = str[i];
        const equal = token === char;

        // 设置 `token` 的值
        const setToken = () => {
            if (str[i - 1] !== '\\') {
                return (!token && (token = char)) || (equal && (token = ''));
            }

            char === token && i--;

            return;
        };

        switch (char) {
            case '{':
            case '}':
            case ';':
            case '(':
            case ')':
            case '[':
            case ']':
                !token && (i = 0);
                break;

            case "'":
                equal && str.slice(i - 1, i + 3).match(word) ? i-- : setToken();
                break;

            case '"':
            case '`':
                setToken();
                break;
        }
    }

    return token;
}
