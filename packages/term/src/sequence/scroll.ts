import { CSI } from './base';

/**
 * 整页向上滚动几行，默认 `1`。新行添加到底部
 *
 * @param line 要移动几行
 */
export const scrollUp = (line: number = 1) => `${CSI + line}S`;

/**
 * 整页向下滚动几行，默认 `1`。新行添加到底部
 *
 * @param line 要移动几行
 */
export const scrollDown = (line: number = 1) => `${CSI + line}T`;

/**
 * 移动屏幕位置
 *
 * 屏幕移动到第几行、第几列。值从一开始，且默认为左上角第一行第一列
 */
export const scrollPosition = (row: number = 1, column: number = 1) => {
    return `${CSI}${row};${column}f`;
};
