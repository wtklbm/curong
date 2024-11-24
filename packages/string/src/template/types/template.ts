/**
 * 用于提取字符串类型 `Text` 中所有变量名称的递归条件类型
 *
 * 该类型解析包含前缀和后缀标识符的文本字符串，提取出被标识符包围的变量名称，并返回这些变量名称的联合类型。
 *
 * @param Text 目标字符串类型，包含待提取的变量
 * @param Prefix 变量的前缀标识符（默认为 `{`）
 * @param Suffix 变量的后缀标识符（默认为 `}`）
 * @param Accumulator 用于累积变量名的类型
 * @example
 *
 * ```typescript
 * type Result1 = GetVariablesHelper<'{name} is a {role}', '{', '}'>;
 * // 'name' | 'role'
 * type Result2 = GetVariablesHelper<'Hello {name}!', '{', '}'>;
 * // 'name'
 * type Result3 = GetVariablesHelper<'{x}{y}{z}', '{', '}'>;
 * // 'x' | 'y' | 'z'
 * type Result4 = GetVariablesHelper<'Hello World', '{', '}'>;
 * // never
 * ```
 *
 * @note
 *  - 该类型依赖于递归的条件语句，确保在匹配到前缀和后缀标识符时提取出变量名称。
 *  - 在处理包含多个嵌套标识符的复杂文本时，需小心避免递归深度过大，导致性能问题。
 */
type GetVariablesHelper<
    Text extends string,
    Prefix extends string,
    Suffix extends string,
    Accumulator
> = string extends Text
    ? string
    : Prefix extends ''
      ? Suffix extends ''
          ? // Prefix === "", Suffix === ""
            Text extends `${infer Letter}${infer Rest}`
              ? GetVariablesHelper<Rest, Prefix, Suffix, Letter | Accumulator>
              : Accumulator
          : // Prefix === "", Suffix !== ""
            Text extends `${infer Variable}${Suffix}${infer Rest}`
            ? GetVariablesHelper<Rest, Prefix, Suffix, Variable | Accumulator>
            : Accumulator
      : Suffix extends ''
        ? // Prefix !== "", Suffix === ""
          Text extends `${infer _Start}${Prefix}${infer Variable}`
            ? Variable extends `${infer _Variable}${Prefix}${infer Rest}`
                ? GetVariablesHelper<
                      `${Prefix}${Rest}`,
                      Prefix,
                      Suffix,
                      _Variable | Accumulator
                  >
                : Variable | Accumulator
            : Accumulator
        : // Prefix !== "", Suffix !== ""
          Text extends `${infer _Start}${Prefix}${infer Variable}${Suffix}${infer Rest}`
          ? Variable extends `${infer _Start}${Prefix}${infer _Variable}`
              ? GetVariablesHelper<
                    `${_Start}${Prefix}${_Variable}${Suffix}${Rest}`,
                    Prefix,
                    Suffix,
                    Accumulator
                >
              : GetVariablesHelper<Rest, Prefix, Suffix, Variable | Accumulator>
          : Accumulator;

/**
 * 用于从字符串 `Text` 中提取所有由 `Prefix` 和 `Suffix` 包围的变量名称
 *
 * 该类型会调用 `GetVariablesHelper` 来递归查找并返回所有变量名称。
 *
 * @param Text 目标字符串类型，包含待提取的变量
 * @param Prefix 变量的前缀标识符（默认为 `{`）
 * @param Suffix 变量的后缀标识符（默认为 `}`）
 * @example
 *
 * ```typescript
 * type Result1 = GetVariables<'Hello {name}!', '{', '}'>;
 * // 'name'
 * type Result2 = GetVariables<'{x}{y}{z}', '{', '}'>;
 * // 'x' | 'y' | 'z'
 * ```
 *
 * @note
 *  - 该类型调用了递归类型 `GetVariablesHelper`，并自动推导出变量类型。
 *  - 在使用时，请确保前缀和后缀符号能够正确匹配，避免提取错误的变量名称。
 */
type GetVariables<
    Text extends string,
    Prefix extends string,
    Suffix extends string
    // https://devblogs.microsoft.com/typescript/announcing-typescript-4-5-beta/#tailrec-conditional
> = GetVariablesHelper<Text, Prefix, Suffix, never>;

/**
 * 用于插值的选项接口，定义了插值时的前缀和后缀符号
 *
 * 该接口用于控制文本插值过程中变量的识别标识符。
 *
 * @param Prefix 变量前缀符号
 * @param Suffix 变量后缀符号
 * @example
 *
 * ```typescript
 * const options: InterpolationOptions<"{{", "}}"> = { prefix: "{{", suffix: "}}" };
 * ```
 */
export interface InterpolationOptions<
    Prefix extends string = DefaultPrefix,
    Suffix extends string = DefaultSuffix
> {
    prefix: Prefix;
    suffix: Suffix;
}

/**
 * 默认的插值前缀符号
 */
type DefaultPrefix = '{';

/**
 * 默认的插值后缀符号
 */
type DefaultSuffix = '}';

type ValueType = string | boolean | number | bigint;

export interface Template {
    <
        Text extends string,
        Prefix extends string = DefaultPrefix,
        Suffix extends string = DefaultSuffix
    >(
        text: Text,
        variables?: Record<GetVariables<Text, Prefix, Suffix>, ValueType>,
        interpolationOptions?: InterpolationOptions<Prefix, Suffix>
    ): string;
}

export interface CreateTemplate {
    <
        _Prefix extends string = DefaultPrefix,
        _Suffix extends string = DefaultSuffix
    >(
        interpolationOptions: InterpolationOptions<_Prefix, _Suffix>
    ): <
        Text extends string,
        Prefix extends string = _Prefix,
        Suffix extends string = _Suffix
    >(
        text: Text,
        variables?: Record<GetVariables<Text, Prefix, Suffix>, ValueType>,
        interpolationOptions?: InterpolationOptions<Prefix, Suffix>
    ) => string;
}
