/** 属性名的类型，属性名是 `string`、`number` 和 `symbol` 类型中的某一个类型。  */
export type PropertyKey = string | number | symbol;

/**
 * 对象的默认类型
 *
 * 对象的属性名是 `string` 或 `number` 或 `symbol` 类型，对象的值是 `any` 类型。
 *
 * @note `Record<PropertyKey, any>` 相当于 `{ [key in PropertyKey]: any }`
 */
export type ObjectType<T = any> = Record<PropertyKey, T>;
