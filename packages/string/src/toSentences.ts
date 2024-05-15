import bindOutside from './bindOutside';
import toRegExpSource from './toRegExpSource';
import type { ToSentencesOptions } from './types';

// 拉丁文缩写列表
// @see https://zh.wikipedia.org/wiki/拉丁文缩写列表
/* prettier-ignore */
const latinAbbreviations = [
    'A.B.', 'A.D.', 'a.m.', 'AMDG', 'a.U.c.', 'a.u.', 'c.', 'ca.', 'ca', 'cca.',
    'Cap.', 'cf.', 'cp.', 'Cp', 'C.V.', 'CV', 'cwt.', 'D.D.', 'D.M.', 'D.Phil.',
    'D.V.', 'DG', 'D.G', 'DEI', 'GRA', 'dwt.', 'ead.', 'et al.', 'etc.', 'et seq.',
    'et seqq', 'et sequa', 'e.g.', 'ff.', 'fl.', 'flor.', 'F D', 'FID', 'DEF',
    'ibid.', 'loq.', 'id.', 'i.a.', 'i.e.', 'in litt.', 'J.D.', 'lb.', 'LL.B.',
    'M.A.', 'M.O.', 'N.B.', 'nem. con.', 'N.N.', 'O.D.', 'op. cit.', 'O.S.',
    'p.a.', 'per cent.', 'Ph.D.', 'p.m.', 'p.m.a.', 'p.p.', 'per pro.', 'PRN',
    'pro tem.', 'prox.', 'P.S.', 'Q.D.', 'Q.E.C.', 'Q.E.D.', 'Q.E.F.', 'q.v.',
    'Re', 'REG', 'R.I.P.', 'sc.', 's.o.s.', 'sphalm.', 'stat.', 'S.T.T.L.',
    's.v.', 'S.V.B.E.E.V.', 'Th.D.', 'ult.', 'V.C.', 'v.i.', 'viz.', 'vs.',
    'v.', 'v.s.',
];

/**
 * 在英语句号拆分时，排除:
 *
 * || "e.g." || "i.e." || "i.a." || "etc." || "ca." || "cf."
 * || "ff." || "c.v." || "p.s." || "a.d." || "p.m." || "p.a."
 * || "ll.b." || "op.cit." || "id." ...
 */
const abbreviationReg = new RegExp(
    `^(${latinAbbreviations
        .filter(v => v.endsWith('.'))
        .map(v => toRegExpSource(v))
        .join('|')})$`,
    'i'
);

/**
 * 验证是不是句点(结束语句标志)的正则
 *
 *
 * ### 测试数据
 *
 * ```txt
 * 我爱中国，中国强大。非常强大！这是 a. 哈哈。
 * 我爱中国，中国强大。。。 特别强大... 理解不了的强大。。。
 * 中. 中的.
 * zero, a value of `0.0`. is one, the result.
 * very e.g. good i.e. very q. 去。中文，句号.
 * ```
 */
const periodReg = /(?:(?:^| \S+|[\u4e00-\u9fff])[.!?;]+ |[。！？；]+) */gi;

/** 验证末尾省略号的正则表达式 */
const ellipsisReg = /[.。]{2,}$/;

/** 验证中文的正则表达式 */
const zhReg = /[\u4e00-\u9fff]/;

/**
 * 将一个字符串拆分为句子数组
 *
 * @param value 要处理的内容
 * @param options 配置选项
 *
 *  - `escape`: 是否支持转义字符，也就是 `\`，默认为 `false`
 *
 * @returns 返回处理的句子数组
 * @example
 *
 * ```javascript
 * const value = 'this is a test. my name is `li ming`';
 * const ret = toSentences(value);
 * console.log(ret); // [ 'this is a test.', 'my name is `li ming`' ]
 * ```
 */
export default function toSentences(
    value: string,
    options?: ToSentencesOptions
): string[] {
    const { ellipsis = true } = options ?? {};

    return bindOutside(
        value,
        options,
        (value: string, index: number, origin: string) =>
            value.replace(periodReg, (v, $1) => {
                const w = v.trim();

                if (
                    abbreviationReg.test(w) ||
                    (!ellipsis && ellipsisReg.test(w)) ||
                    (index === origin.length && origin.endsWith(v))
                ) {
                    return v;
                }

                if (w.length > 1 && !zhReg.test($1)) {
                    return ` ${w}\n`;
                }

                return `${w}\n`;
            })
    ).split('\n');
}
