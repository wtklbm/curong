const testRegExp =
    /^(11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65|71|81|82)[0-9]{15}[0-9Xx]$/;
const weightMap = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
const codeMap = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

const isValidDate = (year: number, month: number, day: number): boolean => {
    const date = new Date(year, month - 1, day);
    return (
        date.getFullYear() === year &&
        date.getMonth() + 1 === month &&
        date.getDate() === day &&
        date.getTime() < new Date().getTime() &&
        year > 1900
    );
};

/**
 * 是不是一个中国的 `18` 位身份证号码
 *
 * @param value 身份证号码
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
 * const ret = isChinaIdCard('15210319861215033x');
 * console.log(ret); // true
 * ```
 */
export default function isChinaIdCard(value: string): boolean {
    const len = value.length;

    if (
        // 长度错误
        len !== 18 ||
        // 模式校验
        !testRegExp.test(value) ||
        // 出生日期
        !isValidDate(
            +value.substr(6, 4),
            +value.substr(10, 2),
            +value.substr(12, 2)
        )
    ) {
        return false;
    }

    // 校验码
    const sum = value
        .split('')
        .slice(0, 17)
        .reduce((s, num, index) => {
            s += +num * weightMap[index];
            return s;
        }, 0);

    return codeMap[sum % 11] === value[17].toUpperCase();
}
