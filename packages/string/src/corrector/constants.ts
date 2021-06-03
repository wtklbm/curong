import { source } from '@curong/regexp';

const { chkPunctuation, han } = source;

/** 包含中文，平假名、片假名等表意字符的字符序列 */
export const symbolArray = [
    '\u2e80-\u2eff',
    '\u2f00-\u2fdf',
    '\u3040-\u309f',
    '\u30a0-\u30fa',
    '\u30fc-\u30ff',
    '\u3100-\u312f',
    '\u3200-\u32ff',
    '\u3400-\u4dbf',
    '\u4e00-\u9fff',
    '\uf900-\ufaff'
];

/** 验证中日韩文字和标点的正则表达式 */
export const chkPunReg = new RegExp(
    `(?:${symbolArray}|${han}|${chkPunctuation})+`,
    'g'
);

/** 中英标点映射表 */
export const symbolMap = new Map([
    ['...', '……'],
    [',', '，'],
    ['.', '。'],
    ['!', '！'],
    ['?', '？'],
    [':', '：'],
    [';', '；'],
    ['~', '～']
]);

/** 字符组的正则源代码  */
export const symbol = symbolArray.join('');

/** 字符组 */
export const symbolGroup = `[${symbol}]`;

/** 验证字符组中的单个字符的正则表达式 */
export const symbolReg = new RegExp(symbolGroup);
