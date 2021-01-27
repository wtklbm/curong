import {
    getTag,
    isBuffer,
    isFunction,
    isNull,
    isPrimitive
} from '@curong/types';

import copyAttrs from './copyAttrs';

/** 拷贝基本类型的值 */
const copyBaseType = (value: any) => {
    return new (Object.getPrototypeOf(value).constructor)(value);
};

/** 拷贝 `ArrayBuffer` */
const copyArrayBuffer = (value: any) => {
    const newArrayBuffer = new value.constructor(value.byteLength);
    new Int16Array(newArrayBuffer).set(new Int16Array(value));

    return newArrayBuffer;
};

/** 根据 `toStringTag` 拷贝类型 */
const copyByTag = (value: any) => {
    switch (getTag(value)) {
        case 'RegExp':
            const reg = new RegExp(value);
            reg.lastIndex = (value as RegExp).lastIndex;
            return reg;

        case 'Array':
        case 'BigInt64Array':
        case 'BigUint64Array':
            return (value as Array<any>).map((v: any) => copy(v));

        case 'DataView':
            const buffer = copyArrayBuffer(value.buffer);
            const { byteOffset, byteLength } = value as DataView;
            return new DataView(buffer, byteOffset, byteLength);

        case 'Blob':
        case 'File':
            const { lastModified, type } = value as File;
            return new File([value], value.name, { lastModified, type });

        // `String` 为 `string` 的包装的形式
        case 'Boolean':
        case 'Date':
        case 'FileReader':
        case 'Map':
        case 'Number':
        case 'Set':
        case 'String':
            return copyBaseType(value);

        case 'ArrayBuffer':
        case 'Float32Array':
        case 'Float64Array':
        case 'Int16Array':
        case 'Int32Array':
        case 'Int8Array':
        case 'Uint16Array':
        case 'Uint32Array':
        case 'Uint8Array':
        case 'Uint8ClampedArray':
            return copyArrayBuffer(value);

        case 'Arguments':
        case 'Object':
        case 'Error':
        case 'EvalError':
        case 'RangeError':
        case 'ReferenceError':
        case 'SyntaxError':
        case 'TypeError':
        case 'Duplex':
        case 'Readable':
        case 'Stream':
        case 'Transform':
        case 'Writable':
            const proto = Object.getPrototypeOf(value);
            const instance = isNull(proto)
                ? Object.create(null)
                : new proto.constructor();
            return copyAttrs(value, instance);

        default:
            throw new Error('[copy]: 无法进行深度拷贝，对象中包含不支持类型');
    }
};

/**
 * 将一个值完整的克隆一份
 *
 * @param value 要克隆的数据
 * @returns 返回克隆好的新的值
 * @throw 如果存在不支持深度克隆的数据类型，该方法会抛出异常
 *
 * ### 支持的类型
 *
 * - 基本类型的值：
 *   - `bigint`
 *   - `boolean`
 *   - `null`
 *   - `number`
 *   - `string`
 *   - `symbol`
 *   - `undefined`
 *
 * - 内置的一些对象：
 *   - `Arguments`
 *   - `Array`
 *   - `Blob`
 *   - `Boolean`
 *   - `Buffer`
 *   - `Date`
 *   - `File`
 *   - `FileReader`
 *   - `Function`
 *   - `Number`
 *   - `Object`
 *   - `RegExp`
 *   - `String`
 *   - `Set`
 *   - `Map`
 *   - `ArrayBuffer`
 *   - `BigInt64Array`
 *   - `BigUint64Array`
 *   - `DataView`
 *   - `Float32Array`
 *   - `Float64Array`
 *   - `Int16Array`
 *   - `Int32Array`
 *   - `Int8Array`
 *   - `Uint16Array`
 *   - `Uint32Array`
 *   - `Uint8Array`
 *   - `Uint8ClampedArray`
 *   - `Error`
 *   - `EvalError`
 *   - `RangeError`
 *   - `ReferenceError`
 *   - `SyntaxError`
 *   - `TypeError`
 *   - `Duplex`
 *   - `Readable`
 *   - `Stream`
 *   - `Transform`
 *   - `Writable`
 *
 * - 其他的一些普通的对象，或者原型为 `null` 的对象
 *
 *
 * ### 不支持的类型
 *
 *   1. `Promise` 是不支持的类型，它没有相关的 `toString` 方法。
 *   2. `WeakSet` 和 `WeakMap` 是不支持的类型，因为他们都不支持迭代器模式。
 *   3. 自定义数据类型是不支持的类型，目前还没有办法将它们一一实现。
 *
 * @example
 *
 * ```javascript
 * const obj = {
 *     str: '',
 *     num: 0,
 *     bool: true
 * };
 *
 * const ret = copy(obj);
 *
 * // {
 * //     str: '',
 * //     num: 0,
 * //     bool: true
 * // }
 * console.log(ret);
 * console.log(ret === obj); // false
 * ```
 */
export default function copy<T extends any>(value: T): T {
    // 首先判断是不是基本类型的值
    if (isPrimitive(value)) {
        return value;
    }

    // 是不是函数
    // 拷贝同步函数，异步函数，箭头函数，`Generator` 函数，但是不能拷贝 `Promise`。
    if (isFunction(value)) {
        const { name } = value;

        // 区分箭头函数和普通函数
        const source = value.toString().startsWith('(')
            ? `const ${name} = ${value}; return ${name};`
            : `return ${value};`;

        return copyAttrs(value, new Function(source)(), true);
    }

    // 是不是 `Buffer`
    if (isBuffer(value)) {
        return copyAttrs(value, Buffer.from(value), true);
    }

    return copyAttrs(value, copyByTag(value), true);
}
