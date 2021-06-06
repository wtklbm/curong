import { symbolGroup as g, symbolMap } from '../constants';

/** 两侧包含中文 */
const bssReg = new RegExp(`(${g}) *(\\.|:+) *(${g})`, 'g');

/** 左侧包含中文，必须保证标点后有一个空格 */
const lsReg = new RegExp(`(${g}) *([,;!?~]+)( +|$)`, 'g');

/** 验证冒号，冒号后面可以有也可以没有空格 */
const colonReg = new RegExp(`(${g}): *([()a-zA-Z0-9])`, 'g');

/** 转换标点 */
const convert = (symbols: string): string => symbolMap.get(symbols) ?? symbols;

/**
 * 转换标点符号
 *
 * @param value 要转换的字符串
 * @returns 返回转换好的字符串
 */
export function convertFullStop(value: string): string {
    value = value.replace(colonReg, '$1：$2');
    value = value.replace(bssReg, (_, l, s, r) => `${l}${convert(s)}${r}`);
    value = value.replace(lsReg, (_, v, s) => `${v}${convert(s)}`);

    return value;
}
