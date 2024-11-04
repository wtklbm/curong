/** 零宽字符 */
const ZERO_WIDTH_CHARS = {
    /** 零宽不折行空格，即 `BOM` */
    ZWNBSP: '\uFEFF',
    /** ​零宽间隔 */
    ZWSP: '\u200B',
    /** 零宽无连接符 */
    ZWNJ: '\u200C',
    /** 零宽连接符 */
    ZWJ: '\u200D',
    /** 从左至右标志 */
    LTRM: '\u200E',
    /** 从右至左标志 */
    RTLM: '\u200F',

    /** 从左至右嵌入 */
    LTRE: '\u202A',
    /** 从右至左嵌入 */
    RTLE: '\u202B',
    /** 退出方向性格式化 */
    PDF: '\u202C',
    /** 从左至右强制 */
    LTRO: '\u202D',
    /** 从右至左强制 */
    RTLO: '\u202E',

    /** 文字连接符 */
    WJ: '\u2060',
    /** 函数应用程序 */
    FA: '\u2061',
    /** 不可见乘号 */
    IT: '\u2062',
    /** 不可见分隔符 */
    IS: '\u2063',
    /** 不可见正号 */
    IP: '\u2064',
    /** 从左至右隔离 */
    LTRI: '\u2066',
    /** 从右至左隔离 */
    RTLI: '\u2067',
    /** 第一个强隔离 */
    FSI: '\u2068',
    /** 流行定向隔离 */
    PDI: '\u2069',

    /** 抑制对称对换 */
    ISS: '\u206A',
    /** 激活对称对换 */
    ASS: '\u206B',
    /** 抑制阿拉伯文形式变形 */
    IAFS: '\u206C',
    /** 激活阿拉伯文形式变形 */
    AAFS: '\u206D',
    /** 民族数字形状 */
    NADS: '\u206E',
    /** 名义数字形状 */
    NODS: '\u206F'
} as const;

/** 看起来像空格的字符 */
const LIKE_SPACE_CHARS = {
    /** 不换行空格 (无中断空格) */
    NBSP: '\u00A0',
    /** 窄的无中断空格 */
    NNBSP: '\u202F',
    /** 中型数学空间 */
    MMSP: '\u205F',
    /** 全角空格 */
    IDSP: '\u3000',

    /** En 间隙 */
    NQSP: '\u2000',
    /** Em 间隙 */
    MQSP: '\u2001',
    /** En 间隔 */
    ENSP: '\u2002',
    /** Em 间隔 */
    EMSP: '\u2003',
    /** 三分之一的 Em 间隔 */
    MSP3: '\u2004',
    /** 四分之一的 Em 间隔 */
    MSP4: '\u2005',
    /** 六分之一的 Em 间隔 */
    MSP6: '\u2006',
    /** 数字间隔 */
    FSP: '\u2007',
    /** 标点间隔 */
    PSP: '\u2008',
    /** 窄间隔 */
    THSP: '\u2009',
    /** 微间隔 */
    HSP: '\u200A'
} as const;

/** 控制符(包含换行、回车、制表符等) */
const CONTROL_CHARS = {
    //# 以下字符包含在 `/\p{Control}/u`

    /** 退格 (Backspace)，即 `\b` */
    BS: '\u0008',
    /** 字符制表符 (Character Tabulation)，即 `\t` */
    HT: '\u0009',
    /** 行结束 (End of Line)，即 `\n` */
    LF: '\u000A',
    /** 行制表符 (Line Tabulation)，即 `\v` */
    VT: '\u000B',
    /** 进纸 (Form Feed)，即 `\f` */
    FF: '\u000C',
    /** 回车 (Carriage Return)，即 `\r` */
    CR: '\u000D',
    /** 下一行 (Next Line)，用于表示文本流中的下一行 */
    NEL: '\u0085',

    //# 以下字符包含在：`/\p{Pattern_White_Space}/u`

    /** 行分隔符，用于分隔文本行而不引入换行符 */
    LSEP: '\u2028',
    /** 段落分隔符，用于指示段落的结束 */
    PSEP: '\u2029'
} as const;


export const controlRegSource = `[${Object.values(CONTROL_CHARS).join('')}]`;
export const zeroWidthRegSource = `[${Object.values(ZERO_WIDTH_CHARS).join('')}]`;
export const likeSpaceRegSource = `[${Object.values(LIKE_SPACE_CHARS).join('')}]`;

export const controlReg = new RegExp(controlRegSource, 'g');
export const zeroWidthReg = new RegExp(zeroWidthRegSource, 'g');
export const likeSpaceReg = new RegExp(likeSpaceRegSource, 'g');

export const controlStartReg = new RegExp(`^${controlRegSource}+`);
export const zeroWidthStartReg = new RegExp(`^${zeroWidthRegSource}+`);
export const likeSpaceStartReg = new RegExp(`^${likeSpaceRegSource}+`);

export const controlEndReg = new RegExp(`${controlRegSource}+$`);
export const zeroWidthEndReg = new RegExp(`${zeroWidthRegSource}+$`);
export const likeSpaceEndReg = new RegExp(`${likeSpaceRegSource}+$`);
