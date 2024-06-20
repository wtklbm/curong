/**
 * 从一个字符串中获取未闭合的引号
 *
 * 比如读取文件的完整内容，判断某个字符是否包含在引号中，
 * 判断的方法就是判断字符左侧和右侧是否含有未闭合的引号，
 * 如果有，那么【可能】该字符串就在引号中
 *
 * @note 该函数是从左向右依次遍历的，它和从右向左的遍历的结果有所不同，
 *   所以该函数的返回结果仅仅作为参考，并不能作为绝对的依据
 *
 * @param str 要验证的字符串
 * @returns 如果引号闭合则返回空字符串，否则返回从前向后找到的第一个未闭合的单个引号
 * @example
 *
 * ```javascript
 * const ret = quotePair(`"this is a i\\"m for ok."/**`);
 * console.log(ret); ''
 * ```
 */
export default function quotePair(str: string): string {
    let token: string = '';

    // 判断是不是英文单词后面的 `'`
    const word = /^[a-zA-Z]'[a-zA-Z]{1,2}[^a-zA-Z]/;

    // 设置 `token` 的值
    const setToken = (char: string, equal: boolean) => {
        (!token && (token = char)) || (equal && (token = ''));
    };

    for (let i = 0, len = str.length; i < len; i++) {
        const char: string = str[i];
        const equal = token === char;

        switch (char) {
            case '\\':
                str[i + 1] === token && i++;
                break;

            case "'":
                if (equal && str.slice(i - 1, i + 3).match(word)) {
                    i++;
                    break;
                }

            case '"':
            case '`':
                setToken(char, equal);
                break;
        }
    }

    return token;
}
