import { CSI } from './base';

/** 移动光标名 */
export type CursorMoveNames = {
    /** 光标向上移动几格，默认为 `1`。如果光标已在屏幕边缘，则无效 */
    up: string;

    /** 光标向下移动几格，默认为 `1`。如果光标已在屏幕边缘，则无效 */
    down: string;

    /** 光标向前移动几格，默认为 `1`。如果光标已在屏幕边缘，则无效 */
    forward: string;

    /** 光标向后移动几格，默认为 `1`。如果光标已在屏幕边缘，则无效 */
    back: string;

    /** 光标移动到下面第几行的开头，默认为 `1` */
    next: string;

    /** 光标移动到上面第几行的开头，默认为 `1` */
    previous: string;

    /** 光标移动到第几列，默认为 `1` */
    absolute: string;
};

/**
 * 移动光标的位置
 *
 * @param move 移动到哪里
 * @param line 移动几行
 */
export const cursorMove = (move: keyof CursorMoveNames, line: number = 1) => {
    const moveNames: CursorMoveNames = {
        up: 'A',
        down: 'B',
        forward: 'C',
        back: 'D',
        next: 'E',
        previous: 'F',
        absolute: 'G'
    };

    return CSI + line + moveNames[move];
};

/**
 * 移动光标位置
 *
 * 光标移动到第几行、第几列。值从一开始，且默认为左上角第一行第一列
 */
export const cursorPosition = (row: number = 1, column: number = 1) => {
    return `${CSI}${row};${column}H`;
};

/** 保存光标的当前位置 */
export const cursorSave = `${CSI}s`;

/** 恢复保存的光标位置 */
export const cursorRestore = `${CSI}u`;

/** 隐藏光标 */
export const cursorHidden = `${CSI}?25l`;

/** 显示光标 */
export const cursorShow = `${CSI}?25h`;

/** 跳转到当前行的开头 */
export const cursorOnLineBegin = `${CSI}A${CSI}E`;
