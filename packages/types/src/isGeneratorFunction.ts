import getTag from './getTag';

/**
 * 是不是一个 `Generator` 函数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isGeneratorFunction(value: any): value is Function {
    return getTag(value) === 'GeneratorFunction';
}
