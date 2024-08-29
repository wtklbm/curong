import { isNullOrUndefined } from '@curong/types';

/**
 * 根据给定的路径数组，从对象中获取嵌套属性的值
 *
 * `get` 函数可以用于安全地获取对象中嵌套的属性值，而不必担心访问不存在的属性会导致错误
 *
 * @param entity 要查询的对象
 * @param paths 属性路径数组，每个元素代表一个对象的键
 * @param onlyPrivate 是否只访问对象的私有属性。默认为 `false`
 * @returns 指定路径的属性值
 * @example
 *
 * ```typescript
 * const obj = { a: { b: { c: 42 } } };
 *
 * console.log(getFromPaths(obj, ['a', 'b', 'c'])); // 42
 * console.log(getFromPaths(obj, ['a', 'b', 'd'])); // undefined
 * ```
 */
export default function getFromPaths<T, K extends keyof any>(
    entity: T,
    paths: K[],
    onlyPrivate: boolean = false
): T[keyof T] | undefined {
    let current: any = entity;

    for (let i = 0, len = paths.length; i < len; i++) {
        if (isNullOrUndefined(current)) {
            return undefined;
        }

        const path = paths[i];

        if (
            onlyPrivate &&
            !Object.prototype.hasOwnProperty.call(current, path)
        ) {
            return undefined;
        }

        current = current[path];
    }

    return current;
}
