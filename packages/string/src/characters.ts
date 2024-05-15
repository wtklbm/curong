import type { ControlChars, LikeSpaceChars, ZeroWidthChars } from './types';

/** 零宽字符 */
export const zeroWidthChars: ZeroWidthChars = {
    ZWNBSP: '\uFEFF',
    ZWSP: '\u200B',
    ZWNJ: '\u200C',
    ZWJ: '\u200D',
    LTRM: '\u200E',
    RTLM: '\u200F',

    LTRE: '\u202A',
    RTLE: '\u202B',
    PDF: '\u202C',
    LTRO: '\u202D',
    RTLO: '\u202E',

    WJ: '\u2060',
    FA: '\u2061',
    IT: '\u2062',
    IS: '\u2063',
    IP: '\u2064',
    LTRI: '\u2066',
    RTLI: '\u2067',
    FSI: '\u2068',
    PDI: '\u2069',

    ISS: '\u206A',
    ASS: '\u206B',
    IAFS: '\u206C',
    AAFS: '\u206D',
    NADS: '\u206E',
    NODS: '\u206F'
};

/** 看起来像空格的字符 */
export const likeSpaceChars: LikeSpaceChars = {
    NBSP: '\u00A0',
    MMSP: '\u205F',
    NNBSP: '\u202F',
    IDSP: '\u3000',

    NQSP: '\u2000',
    MQSP: '\u2001',
    ENSP: '\u2002',
    EMSP: '\u2003',
    MSP3: '\u2004',
    MSP4: '\u2005',
    MSP6: '\u2006',
    FSP: '\u2007',
    PSP: '\u2008',
    THSP: '\u2009',
    HSP: '\u200A'
};

/** 控制符(包含换行、回车、制表符等) */
export const controlChars: ControlChars = {
    LSEP: '\u2028',
    PSEP: '\u2029',

    TAB: '\t',
    CR: '\r',
    LF: '\n',
    FF: '\f',
    VT: '\v',
    BS: '\b',
    NEL: '\u0085'
};

/** 特殊字符集，包含零宽字符、像空格的字符、控制符 */
export const specialChars = {
    SP: ' ' as ' ',
    ...zeroWidthChars,
    ...likeSpaceChars,
    ...controlChars
};

export const controlRegSource = `[${Object.values(controlChars).join('')}]`;
export const zeroWidthRegSource = `[${Object.values(zeroWidthChars).join('')}]`;
export const likeSpaceRegSource = `[${Object.values(likeSpaceChars).join('')}]`;

export const controlReg = new RegExp(controlRegSource, 'g');
export const zeroWidthReg = new RegExp(zeroWidthRegSource, 'g');
export const likeSpaceReg = new RegExp(likeSpaceRegSource, 'g');

export const controlStartReg = new RegExp(`^${controlRegSource}+`);
export const zeroWidthStartReg = new RegExp(`^${zeroWidthRegSource}+`);
export const likeSpaceStartReg = new RegExp(`^${likeSpaceRegSource}+`);

export const controlEndReg = new RegExp(`${controlRegSource}+$`);
export const zeroWidthEndReg = new RegExp(`${zeroWidthRegSource}+$`);
export const likeSpaceEndReg = new RegExp(`${likeSpaceRegSource}+$`);
