/** `ASCII` 转义字符：`0x1B` */
export const ESC = '\u001B';

/**
 * CSI (`\u001B[`)
 *
 * `[` 表示引入带有参数的控制序列
 */
export const CSI = ESC + '[';

/** 保存当前的光标位置和属性 */
export const SaveCursorAndAttr = ESC + '7';

/** 恢复之前保存的光标位置和属性 */
export const restoreCursorAndAttr = ESC + '8';

/** 将所有终端设置重置为默认值 */
export const ResetDevice = ESC + 'c';

/** 如果文本长于显示区域的长度，则文本将自动换行到下一行 */
export const lineWrapOpen = CSI + '7h';

/** 禁用自动换行 */
export const lineWrapClose = CSI + '7l';

/** 恢复为默认字体 */
export const restoreFont = ESC + '(';
