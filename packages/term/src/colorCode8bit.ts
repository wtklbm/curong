import { isUintSafe } from '@curong/types';

import { ColorCodeResult } from './types/color';

/**
 * 使用从0到255的任意数字生成8位的终端颜色代码
 *
 * @param colorCode 从0到255的任意数字
 * @returns 返回生成好的前景色和背景色终端代码
 */
export default function colorCode8bit(colorCode: number): ColorCodeResult {
    if (!isUintSafe(colorCode) || colorCode < 0 || colorCode > 255) {
        throw new TypeError(
            `[colorCode8bit]: colorCode不是一个有效数字, "${colorCode}"`
        );
    }

    return {
        foreground: `38;5;${colorCode}`,
        background: `48;5;${colorCode}`
    };
}
