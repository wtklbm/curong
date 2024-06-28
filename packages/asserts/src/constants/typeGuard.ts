export default function typeGuard(
    value: unknown,
    variableName: string,
    isType: (value: any, ...args: any[]) => boolean,
    ...args: unknown[]
) {
    if (!isType(value, ...args)) {
        throw new TypeError(
            `[assert${isType.name.replace(/^is/, '')}] 类型断言失败，"${variableName}" 的类型与该函数所指定的类型不匹配`
        );
    }
}
