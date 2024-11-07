import { isMiniProgram, type MiniProgramBrand } from '@curong/types';

/**
 * 当前的执行环境是不是小程序
 *
 * @param brand 小程序的品牌，可选的值为：微信、QQ、支付宝、京东、百度、字节跳动、钉钉
 * @throws 如果不是则会抛出类型异常
 */
export default function assertMiniProgram(
    brand?: MiniProgramBrand | MiniProgramBrand[]
) {
    if (!isMiniProgram(brand)) {
        throw new TypeError('[assertMiniProgram] 当前的执行环境是不是小程序');
    }
}
