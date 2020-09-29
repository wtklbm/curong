import { AnsiFormatOptions } from './ansiFormat';

/** 颜色名 */
export type ColorName =
    | 'black'
    | 'red'
    | 'green'
    | 'yellow'
    | 'blue'
    | 'magenta'
    | 'cyan'
    | 'white'
    | 'lightblack'
    | 'lightred'
    | 'lightgreen'
    | 'lightyellow'
    | 'lightblue'
    | 'lightmagenta'
    | 'lightcyan'
    | 'lightwhite';

/** 终端的类型 */
export type TerminalType =
    | 'VGA'
    | 'CMD'
    | 'Terminal.app'
    | 'PuTTY'
    | 'mlRC'
    | 'xterm'
    | 'Ubuntu';

/** 颜色名代码 */
export type ColorCodeResult = {
    /** 前景色 */
    foreground: string;

    /** 背景色 */
    background: string;
};

/** 配置选项 */
export type FontColorOptions = AnsiFormatOptions & {
    /** 要对文字设置的前景色 */
    foreground?: ColorName;

    /** 要对文字设置的背景色 */
    background?: ColorName;
};
