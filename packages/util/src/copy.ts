import {
    getTag,
    hasOwnProperty,
    isBigIntPrimitive,
    isBuffer,
    isFunction,
    isNull,
    isPrimitive,
    isSymbol,
    isSymbolPrimitive
} from '@curong/types';

import allAttrs from './allAttrs';
import lackAttrs from './lackAttrs';

/** 拷贝基本类型的值 */
const copyBaseType = (value: any) => {
    return new (Object.getPrototypeOf(value).constructor)(value.valueOf());
};

/** 拷贝 `ArrayBuffer` */
const copyArrayBuffer = (value: any) => {
    const newArrayBuffer = new value.constructor(value.byteLength);
    new Uint8Array(newArrayBuffer).set(new Uint8Array(value));

    return newArrayBuffer;
};

const copyGenerator = <T>(gen: Generator<T>): (() => Generator<T>) => {
    const state: T[] = [];

    for (let value of gen) {
        state.push(value);
    }

    function* newGenerator(): Generator<T> {
        for (let value of state) {
            yield value;
        }
    }

    return newGenerator;
};

const copyAttrs = <T extends object>(
    src: any,
    dest: any,
    hash: WeakMap<T, T>
) => {
    return lackAttrs(dest, allAttrs(src)).reduce((memo, key) => {
        // 有可能是 `getter` 和 `setter`
        const descriptor = Object.getOwnPropertyDescriptor(src, key);

        if (descriptor) {
            let get;
            let set;

            if (isFunction(descriptor.get)) {
                get = copyFunction(descriptor.get, hash);
            }

            if (isFunction(descriptor.set)) {
                set = copyFunction(descriptor.set, hash);
            }

            Object.defineProperty(memo, key, {
                ...descriptor,
                ...(get || set
                    ? { get, set }
                    : { value: recursiveCopy(src[key], hash) })
            });
        } else {
            memo[key] = recursiveCopy(src[key], hash);
        }

        return memo;
    }, dest);
};

/** 根据 `toStringTag` 拷贝类型 */
const copyByTag = <T extends object>(value: any, weak: WeakMap<T, T>) => {
    const typeTag = getTag(value);

    switch (typeTag) {
        case 'Null':
        case 'Undefined':
            return value;

        case 'BigInt':
            return isBigIntPrimitive(value)
                ? BigInt(value)
                : Object(BigInt(value));

        case 'Boolean':
        case 'Number':
        case 'String':
            return isPrimitive(value) ? value : copyBaseType(value);

        case 'Symbol':
            return isSymbolPrimitive(value)
                ? Symbol(value.description)
                : Object(Symbol(value.description));

        case 'RegExp': {
            const reg = new RegExp(value);
            reg.lastIndex = (value as RegExp).lastIndex;
            return reg;
        }

        case 'BigInt64Array':
        case 'BigUint64Array':
            return new value.constructor(value);

        case 'DataView': {
            const buffer = copyArrayBuffer(value.buffer);
            const { byteOffset, byteLength } = value as DataView;
            return new DataView(buffer, byteOffset, byteLength);
        }

        case 'Blob':
            return new Blob([value], { type: value.type });

        case 'File': {
            const { lastModified, type } = value as File;
            return new File([value], value.name, { lastModified, type });
        }

        case 'FormData': {
            const formData = new value.constructor();
            for (const [k, v] of value) {
                formData.append(k, v);
            }
            return formData;
        }

        // `String` 为 `string` 的包装的形式
        case 'Date':
        case 'FileReader':
        case 'Set':
        case 'Map':
        case 'URL':
        case 'URLSearchParams':
            return copyBaseType(value);

        case 'Generator':
            return copyGenerator(value);

        case 'ArrayBuffer':
        case 'SharedArrayBuffer':
        case 'Int8Array':
        case 'Uint8Array':
        case 'Uint8ClampedArray':
        case 'Int16Array':
        case 'Uint16Array':
        case 'Int32Array':
        case 'Uint32Array':
        case 'Float32Array':
        case 'Float64Array':
            return copyArrayBuffer(value);

        case 'Arguments':
        case 'Array':
        case 'Object':
        case 'Duplex':
        case 'Readable':
        case 'Stream':
        case 'Transform':
        case 'Writable': {
            const proto = Object.getPrototypeOf(value);
            const instance = isNull(proto)
                ? Object.create(null)
                : new proto.constructor();
            weak.set(value, instance);
            return copyAttrs(value, instance, weak);
        }

        case 'DOMException':
        case 'Error':
        case 'EvalError':
        case 'RangeError':
        case 'ReferenceError':
        case 'SyntaxError':
        case 'TypeError':
        case 'URIError': {
            const ins =
                value instanceof AggregateError
                    ? new AggregateError(value.errors.map(copy), value.message)
                    : new (Object.getPrototypeOf(value).constructor)();

            weak.set(value, ins);
            const o = copyAttrs(value, ins, weak);
            o.stack = value.stack; // 堆栈也要一样
            return o;
        }

        default:
            throw new EvalError(
                `[copy]: 无法进行深度拷贝，${typeTag} 为不支持的类型`
            );
    }
};

const getDescriptorSource = (src: string, name: string, flag: string) => `
  const o = { ${src} }; return Object.getOwnPropertyDescriptor(o, '${name}').${flag};
`;

const copyFunction = (value: any, weak: any) => {
    const { name } = value;
    const src = Function.prototype.toString.call(value);
    let source: string;
    let m: any;

    // 如果是 `ECMAScript` 原生函数
    if (
        // `function () { [native code] }` 中包含 `[native code]`
        src.includes('[native code]') &&
        // 不是经过 `.bind()` 之后的函数
        !(name.startsWith('bound ') && !hasOwnProperty(value, 'prototype'))
    ) {
        return value;
    }

    // 区分 `getter`、`setter`、箭头函数和普通函数，生成不同的函数源代码
    if ((m = /^(get|set) (\S+)$/.exec(name))) {
        const [, flag, name] = m;
        source = getDescriptorSource(src, name, flag);
    } else if (/^(:?async ?\* ?)?\[/.test(src)) {
        // 处理类似于 `[Symbol.iterator]() {}` || `async *[Symbol.asyncIterator]() {}` 的情况
        source = `const __$$INNER$$__ = { ${src} }; return __$$INNER$$__${name};`;
    } else {
        source = `return ${src};`;
    }

    return copyAttrs(value, new Function(source!)(), weak);
};

function recursiveCopy<T extends object>(
    value: any,
    weak: WeakMap<T, T> = new WeakMap()
) {
    if (isSymbol(value)) {
        return Object(Symbol.prototype.valueOf.call(value));
    }

    // 首先判断是不是基本类型的值
    if (isPrimitive(value)) {
        return value;
    }

    // 是不是函数
    // 拷贝同步函数，异步函数，箭头函数，`Generator` 函数，但是不能拷贝 `Promise`。
    if (isFunction(value)) {
        return copyFunction(value, weak);
    }

    // 是不是 `Buffer`
    if (isBuffer(value)) {
        return copyAttrs(value, Buffer.from(value), weak);
    }

    if (weak.has(value)) {
        return weak.get(value);
    }

    return copyAttrs(value, copyByTag(value, weak), weak);
}

/**
 * 将一个值完整的克隆一份
 *
 * @param value 要克隆的数据
 * @returns 返回克隆好的新的值
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Structured_clone_algorithm 结构化克隆算法}
 * @note 该方法使用了 `new Function`，如果用户禁用了 [eval](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval)，则导致代码异常
 * @throw
 *
 * - 如果存在不支持深度克隆的数据类型，则会抛出异常
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
 *   - `FormData`
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
 *   - `DOMException`
 *   - `Error`
 *   - `EvalError`
 *   - `RangeError`
 *   - `ReferenceError`
 *   - `SyntaxError`
 *   - `TypeError`
 *   - `URIError`
 *   - `URL`
 *   - `URLSearchParams`
 *   - `Duplex`
 *   - `Readable`
 *   - `Stream`
 *   - `Transform`
 *   - `Writable`
 *
 * - 其他的一些普通的对象，或者原型为 `null` 的对象
 *
 *
 * ### 已知的不支持类型
 *
 * - 自定义数据类型: 还没有办法将它们一一实现
 * - `ECMAScript` 原生函数: 源代码不可见
 * - `Promise`: 没有相关的 `toString` 方法
 * - `WeakSet`、`WeakMap` 和 `WeakRef`: 不支持迭代器模式，无法迭代
 * - `Event`
 * - `CustomEvent`
 * - `DataTransfer`
 *
 * # 常见的拷贝方法
 *
 *  1. `Object.assign({}, value)`，这是一种浅克隆
 *  2. `JSON.parse(JSON.stringify(value))`
 *     1. 它不支持函数等特殊类型
 *     2. 可能造成循环引用和内存泄漏
 *     3. 所有对象的构造函数都会执行 `Object.prototype`
 *
 * @example
 *
 * ```typescript
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
export default function copy<T>(value: T): T {
    return recursiveCopy(value);
}
