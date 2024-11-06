/**
 * 验证与汉语书写相关的其他表意文字
 *
 * 这个表达式匹配所有满足 `Ideographic=yes` 的 `Unicode` 字符。它是 `Unified_Ideograph=yes` 的超集
 * 囊括了所有统一表意文字、西夏文及其组件、女书、中日韩兼容性字符、苏州码子、「〇」以及日本语中的书信结尾标志「〆」 ...
 *
 * @note 该正则是自动生成的。原始代码: [`/\p{Ideographic}/u`](https://mothereff.in/regexpu#input=/\p{Ideographic}/u)
 * @see https://www.unicode.org/reports/tr44/#Ideographic
 */
const ideographic =
    '(?:[\u3006\u3007\u3021-\u3029\u3038-\u303A\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFA6D\uFA70-\uFAD9]|\uD81B\uDFE4|[\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82C[\uDD70-\uDEFB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])';

export default ideographic;
