import { isZero } from '@curong/types';

/**
 * 以行的长度进行排列，并以升序的排列方式返回行号数组
 *
 * @param lines 要进行排列的行数组
 * @returns 返回排列好的行号数组
 * @example
 *
 * ```javascript
 * const lines = ['this is a test.', 'omg', 'hello world.', 'very good'];
 * const codes = sortToCodes(lines);
 * console.log(codes); // [1, 3, 2, 0]
 * ```
 */
export default function sortToCodes(lines: string[]): number[] {
    if (isZero(lines.length)) {
        return [];
    }

    const cowCodes = lines.reduce((memo, value, index) => {
        memo[value.length] = (memo[value.length] ?? []).concat(index);
        return memo;
    }, {} as { [key: string]: number[] });

    const lineCodes = Object.keys(cowCodes)
        .sort((a, b) => parseInt(a) - parseInt(b))
        .reduce((memo, key) => memo.concat(cowCodes[key]), [] as number[]);

    return lineCodes;
}
