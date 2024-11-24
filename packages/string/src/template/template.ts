import { isUndefined } from '@curong/types';

import type { CreateTemplate, InterpolationOptions, Template } from './types';

/**
 * 默认的插值选项，前缀为 `{`，后缀为 `}`
 */
const DEFAULT_INTERPOLATION_OPTIONS: InterpolationOptions = {
    prefix: '{',
    suffix: '}'
};

/**
 * 用于匹配正则表达式中的特殊字符
 *
 * 该正则表达式用于转义字符串中的正则表达式特殊字符，以避免它们在构造正则时产生错误。
 *
 * @see http://ecma-international.org/ecma-262/7.0/#sec-patterns
 */
const reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/**
 * 检查字符串是否包含正则表达式特殊字符的正则表达式
 */
const reHasRegExpChar = RegExp(reRegExpChar.source);

/**
 * 转义字符串中的正则表达式特殊字符
 *
 * 该函数用于将字符串中的正则表达式特殊字符进行转义，以便可以安全地用于正则表达式中。
 *
 * @param value 需要转义的字符串
 * @returns 转义后的字符串
 * @example
 *
 * ```typescript
 * escapeRegExp("Hello (World)"); // "Hello \(World\)"
 * ```
 */
const escapeRegExp = (value: string): string => {
    if (!value || !reHasRegExpChar.test(value)) {
        return value;
    }

    return value.replace(reRegExpChar, '\\$&');
};

/**
 * 对模板字符串执行插值操作
 *
 * 该函数接受一个字符串模板，并根据给定的变量对象替换模板中的变量，返回插值后的字符串。
 *
 * @param text 需要插值的字符串模板
 * @param variables 替换的变量对象，键为变量名称，值为相应的值
 * @param interpolationOptions 可选的插值选项，用于自定义前缀和后缀（默认为 `{` 和 `}`）
 * @returns 插值后的字符串
 * @example
 *
 * ```typescript
 * template("Hello {name}!", { name: "Alice" }); // "Hello Alice!"
 * ```
 */
export const template: Template = (text, variables, interpolationOptions) => {
    if (isUndefined(variables)) {
        return text;
    }

    const { prefix, suffix } = isUndefined(interpolationOptions)
        ? DEFAULT_INTERPOLATION_OPTIONS
        : interpolationOptions;

    const resultText = Object.entries(variables).reduce<string>(
        (resultText, [name, value]) => {
            const regExpSource = escapeRegExp(`${prefix}${name}${suffix}`);
            const regExp = new RegExp(regExpSource, 'g');

            return resultText.replace(regExp, String(value));
        },
        text
    );

    return resultText;
};

/**
 * 配置插值选项并返回一个执行插值操作的函数
 *
 * 该函数允许通过配置自定义插值的前缀和后缀符号，并返回一个可用的插值函数。
 *
 * @param interpolationOptions 插值选项，定义了前缀和后缀符号
 * @returns 返回一个可执行插值操作的函数
 * @example
 *
 * ```typescript
 * const configure = createTemplate({ prefix: "{{", suffix: "}}" });
 * const result = configure("Hello {{name}}!", { name: "Charlie" });
 * // "Hello Charlie!"
 * ```
 */
export const createTemplate: CreateTemplate =
    interpolationOptionsFromConfigures =>
    (text, variables, interpolationOptionsFromInnerFunction) => {
        const interpolationOptions = isUndefined(
            interpolationOptionsFromInnerFunction
        )
            ? interpolationOptionsFromConfigures
            : interpolationOptionsFromInnerFunction;

        return template(
            text,
            variables,
            interpolationOptions as typeof interpolationOptionsFromInnerFunction
        );
    };
