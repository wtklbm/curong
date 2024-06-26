import {
    isFunctionFilled,
    isNull,
    isStringFilled,
    isUndefined
} from '@curong/types';

import type { RegExpExecOrigin } from './types';

/**
 * 验证捕获到的对象中的属性名的正则表达式
 *
 * ### 这里定义 `[0-9]{1,2}` 的原因是什么？
 *
 * `0` 表示的是捕获到的值，而大于 `0` 的整数表示的是捕获到的小分组。
 * 虽然小分组可以写无数个，但是一般在定义小分组时，小分组的个数不会超过 100 个。
 */
const matchKeysReg = /^([0-9]{1,2}|index|input|groups|length)$/;

/**
 * 循环遍历 `RegExp.exec` 方法捕获到的内容
 *
 * 该方法等同于 `String.matchAll` 方法，与它不同的是该方法可以兼容低版本浏览器。
 * 如果不在乎兼容问题，请使用 `String.matchAll`。
 *
 * @param reg 要使用的正则表达式
 * @param str 原始字符串，如果需要全局捕获则增加 `g` 选项
 * @param keyOrCallback 捕获到的对象中的属性名或者包含一个参数的回调函数
 * @return 返回经过处理的捕获到的内容
 * @throws
 *
 * - 如果 `keyOrCallback` 不是预期的值，则会抛出异常
 *
 * @example ````
 *
 * # 将捕获到的值放入数组中
 *
 * ```javascript
 * const str = '123abc123';
 * const ret = execAll(/\d+/g, str, 0);
 *
 * console.log(ret); // [ '123', '123' ];
 * ```
 *
 * # 自定义处理逻辑
 *
 * ```javascript
 * const str = '123abc123';
 * const numbers = [];
 *
 * execAll(/\d+/g, str, match => {
 *     numbers.push(parseInt(match[0]));
 * });
 *
 * console.log(numbers); // [ 123, 123 ];
 * ```
 *
 * ### 1. 如果只想保留捕获到的某一个属性，那么属性名可能为以下的值:
 *
 * - `0`: 捕获到的值
 * - `1+` (大于 0 且小于 100 的任意整数，超出则会抛出异常): 捕获到的小分组
 * - `index`: 当前值在字符串中的索引位置
 * - `input`: 原始字符串
 * - `groups`: 命名捕获组或 `undefined`
 * - `length`: 值为 `1`
 *
 * ### 2. 回调函数的参数就是当前捕获到的内容，回调函数可以返回值也可以不返回值。
 *
 * - 如果回调函数返回了值，则会把值添加到一个数组中，等到捕获结束之后会返回这个数组。
 *
 * - 如果回调函数没有返回值，则需要用户手动处理。
 *
 * ### `String.match`、 `String.matchAll` 和 `RegExp.exec` 的区别
 *
 * #### `RegExp.exec`
 *
 * `exec()` 方法在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 `null`。
 * 在设置了 `g` 或 `y` 标志位的情况下，`RegExp` 对象是有状态的。
 * 他们会将上次成功匹配后的位置记录在 `lastIndex` 属性中。
 * 使用此特性，`exec()` 可用来对单个字符串中的多次匹配结果进行逐条的遍历（包括捕获到的匹配），
 * 而相比之下， `String.prototype.match()` 只会返回匹配到的结果。
 * 如果你只是为了判断是否匹配（`true` 或 `false`），可以使用 `RegExp.test()` 方法，或者 `String.search()` 方法。
 *
 * 如果匹配成功，该方法返回一个数组（包含 `index` 和 `input`），并更新对象的 `lastIndex` 属性。
 * 完全匹配成功的文本将作为返回数组的第一项，从第二项起，后续每项都对应正则表达式内捕获括号里匹配成功的文本。
 * 如果匹配失败，该方法返回 `null`，并将 `lastIndex` 重置为 `0` 。
 *
 * - `exec` 方法只会匹配第一个符合的字符串（意味着 `g` 对其不起作用），跟所有分组的反向引用
 * - `g` 对它不生效
 * - 如果没有小分组:
 *   - 有匹配内容，它只返回第一个匹配的内容，只返回捕获到的第一个元素的数组
 *   - 如果没有匹配内容，返回 `null`
 * - 如果有小分组，且找到了匹配:
 *   - 返回的数组包含多个元素，第一个元素是找到的匹配，之后的元素为各个分组找到的匹配内容
 *
 * #### `String.match`
 *
 * 如果传入一个非正则表达式对象，则会隐式地调用 `new RegExp` 将其转换为一个 `RegExp`。
 * 如果你没有给出任何参数并直接使用 `match()` 方法 ，你将会得到一个包含空字符串的 `Array ：[""]`
 *
 * - 如果正则不包含 `g` 标志，`String.match` 将返回与 `RegExp.exec` 相同的结果。
 * - 如果使用 `g` 标志，则将返回与完整正则表达式匹配的所有结果，但 **不会返回捕获组**。
 * - 如果未使用 `g` 标志，则仅返回第一个完整匹配及其相关的捕获组。
 * - 如果未找到匹配则为 `null`
 *
 * #### `String.matchAll`
 *
 * `matchAll()` 方法返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。
 * 迭代器不可重用，结果耗尽需要再次调用方法，获取一个新的迭代器。
 *
 * - 返回迭代器，使用 `for..of..` 遍历
 * - 可以进行分组捕获
 * - 不兼容 `IE`、`Safari` 和 `IOS`
 */

export default function execAll(
    reg: RegExp,
    str: string,
    keyOrCallback: number
): string[];

export default function execAll(
    reg: RegExp,
    str: string,
    keyOrCallback: 'index'
): number[];

export default function execAll(
    reg: RegExp,
    str: string,
    keyOrCallback: 'input'
): string[];

export default function execAll(
    reg: RegExp,
    str: string,
    keyOrCallback: 'groups'
): Record<string, string>[];

export default function execAll(
    reg: RegExp,
    str: string,
    keyOrCallback: 'length'
): number[];

export default function execAll(
    reg: RegExp,
    str: string,
    keyOrCallback?: (m: RegExpExecOrigin) => RegExpExecOrigin
): RegExpExecOrigin[];

export default function execAll<
    T extends RegExpExecOrigin[keyof RegExpExecOrigin]
>(reg: RegExp, str: string, keyOrCallback: (m: RegExpExecOrigin) => T): T[];

export default function execAll(
    reg: RegExp,
    str: string,
    keyOrCallback?: (m: RegExpExecOrigin) => void
): void;

export default function execAll(
    reg: RegExp,
    str: string,
    keyOrCallback?: (m: RegExpExecOrigin) => any
): any[];

export default function execAll(
    reg: RegExp,
    str: string,
    keyOrCallback?: any
): any {
    const res = [];
    let match: RegExpExecOrigin | null = null;

    do {
        if (isStringFilled(keyOrCallback)) {
            const id = keyOrCallback.toLocaleLowerCase();

            if (!matchKeysReg.test(id)) {
                throw new TypeError(`[execAll]: id不是预期的值, "${id}"`);
            }

            keyOrCallback = (match: RegExpExecOrigin) => match[id as any];
            break;
        }

        if (isFunctionFilled(keyOrCallback)) {
            break;
        }

        keyOrCallback = (match: RegExpExecOrigin) => match;
    } while (false);

    do {
        match = reg.exec(str) as RegExpExecOrigin;
        match && res.push(keyOrCallback(match));
    } while (reg.global && match);

    if (
        res.length &&
        (res.every(v => isUndefined(v)) || res.every(v => isNull(v)))
    ) {
        return;
    }

    return res;
}
