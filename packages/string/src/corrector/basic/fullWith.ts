const fullReg = /[\uff01-\uff5e]/;
const ignoreSet = new Set(['，', '？', '！', '：', '；', '（', '）']);

const mapBytes = (item: string, index: number): string => {
    // 忽略常用的中文标点
    if (ignoreSet.has(item)) {
        return item;
    }

    // 全角空格
    if (item === '\u3000') {
        // 半角空格，即空格
        return '\u0020';
    }

    if (fullReg.test(item)) {
        fullReg.lastIndex = index;

        // `全角(65281-65374) - 65248 = 半角((33-126))`
        return String.fromCharCode(item.charCodeAt(0) - 65248);
    }

    return item;
};

/**
 * 将字符串中的可以转换为 `ASCII` 的全角字符全部转换为半角字符
 *
 * 注意：中文标点所对应的 `。` || `’` || `”` || `、` 不会转换为 `.` || `'` || `"` || `/`。
 * 比如，全角句号(`．`)会被转换为英文中的点(`.`)，而中文的句号标点(象形字句号 `。`)不能转换为英文中的点。
 * ``
 * 转换的字符包括：
 *  - 全角空格(`\u3000`)
 *  - `０-９`
 *  - `ａ-ｚ` 和 `Ａ-Ｚ`
 *  - `（） ［］ ｛｝ ＜＞`
 *  - `， ． ！ ？ ： ；`
 *  - `＇ ＂` 和 反引号(｀)
 *  - `＋ － ＊ ／ ＝ ％`
 *  - `＃ ＄ ＆ ＠ ＼ ＾ ＿ ｜ ～`
 *
 * @param value 要转换的字符串
 * @returns 返回转换好的字符串
 */
export default function halfWidth(value: string): string {
    return value.split('').map(mapBytes).join('');
}
