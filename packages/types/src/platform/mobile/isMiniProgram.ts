import type { MiniProgramBrand } from './types';

declare const wx: any;
declare const qq: any;
declare const my: any;
declare const jd: any;
declare const swan: any;
declare const tt: any;
declare const dd: any;

// FIXME 这里可能需要使用 `globalThis`
const factories: Record<MiniProgramBrand, () => boolean> = {
    微信: () => typeof wx !== 'undefined' && !!wx,
    QQ: () => typeof qq !== 'undefined' && !!qq,
    支付宝: () => typeof my !== 'undefined' && !!my,
    京东: () => typeof jd !== 'undefined' && !!jd,
    百度: () => typeof swan !== 'undefined' && !!swan,
    字节跳动: () => typeof tt !== 'undefined' && !!tt,
    钉钉: () => typeof dd !== 'undefined' && !!dd
};

/**
 * 当前的执行环境是不是小程序
 *
 * @param brand 小程序的品牌，可选的值为：微信、QQ、支付宝、京东、百度、字节跳动、钉钉
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isMiniProgram(
    brand?: MiniProgramBrand | MiniProgramBrand[]
): boolean {
    return brand
        ? [brand].flat().some(v => factories[v]())
        : Object.values(factories).some(f => f());
}
