// [49746db](https://github.com/dubzzz/fast-check/blob/main/packages/fast-check/src/utils/stringify.ts)

import {
    getTag,
    isArraySparse,
    isBigIntPrimitive,
    isBooleanPrimitive,
    isBuffer,
    isFunction,
    isNull,
    isNumberPrimitive,
    isPrototype,
    isStringPrimitive,
    isTypeofObject,
    isUndefined,
    type TypedArray
} from '@curong/types';

/**
 * 使用此符号为您的实例定义自定义序列化器。
 * 序列化器必须是一个返回字符串的函数 (参见 {@link WithToStringMethod})。
 */
export const toStringMethod: unique symbol = Symbol.for('__TO_STRING_METHOD__');

/**
 * 为 {@link toStringMethod} 实现的接口
 */
export type WithToStringMethod = { [toStringMethod]: () => string };

const ofReg = /^(object|function)$/;

/**
 * 检查实例是否实现 {@link WithToStringMethod}
 */
export const hasToStringMethod = <T>(
    instance: T
): instance is T & WithToStringMethod => {
    return (
        instance != null &&
        ofReg.test(typeof instance) &&
        toStringMethod in (instance as any) &&
        typeof (instance as any)[toStringMethod] === 'function'
    );
};

/**
 * 使用此符号为您的实例定义自定义序列化器。
 * 序列化器必须是一个返回字符串 promise 的函数 (参见 {@link WithAsyncToStringMethod})。
 *
 * 请注意:
 * 1. 它仅对异步属性有用。
 * 2. 它必须立即返回。
 */
export const asyncToStringMethod: unique symbol = Symbol.for(
    '__ASYNC_TO_STRING_METHOD__'
);

/**
 * 为 {@link asyncToStringMethod} 实现的接口
 */
export type WithAsyncToStringMethod = {
    [asyncToStringMethod]: () => Promise<string>;
};

/**
 * 检查实例是否实现 {@link WithAsyncToStringMethod}
 */
export const hasAsyncToStringMethod = <T>(
    instance: T
): instance is T & WithAsyncToStringMethod => {
    return (
        instance !== null &&
        ofReg.test(typeof instance) &&
        asyncToStringMethod in (instance as any) &&
        typeof (instance as any)[asyncToStringMethod] === 'function'
    );
};

type AsyncContent = {
    state: 'fulfilled' | 'rejected' | 'pending' | 'unknown';
    value: unknown;
};

/**
 * 仅使用 Symbol(string | undefined) 产生的符号调用，而不是 Symbol.for(string)
 */
const getSymbolDescription = (s: symbol): string | null => {
    if (s.description !== undefined) return s.description;

    // 节点 6、8、10 (不是 12) 中的描述始终未定义
    const m = /^Symbol\((.*)\)$/.exec(String(s));
    // 对于节点 < 12，'' 被认为等同于未定义 (无法区分未定义和 '')，而对于节点 12 及以上，s.description 将等于 ''
    return m && m[1].length ? m[1] : null;
};

const stringifyNumber = (value: number) => {
    switch (value) {
        case 0:
            return 1 / value === Number.NEGATIVE_INFINITY ? '-0' : '0';

        case Number.EPSILON:
            return '2.220446049250313e-16';
        case -Number.EPSILON:
            return '-2.220446049250313e-16';

        case Number.MAX_SAFE_INTEGER:
            return '9007199254740991';
        case Number.MIN_SAFE_INTEGER:
            return '-9007199254740991';

        case Number.MAX_VALUE:
            return '1.7976931348623157e+308';
        case -Number.MAX_VALUE:
            return '-1.7976931348623157e+308';

        case Number.MIN_VALUE:
            return '5e-324';
        case -Number.MIN_VALUE:
            return '-5e-324';

        case Number.POSITIVE_INFINITY:
            return 'Infinity';

        case Number.NEGATIVE_INFINITY:
            return '-Infinity';

        default:
            return Number.isNaN(value) ? 'NaN' : String(value);
    }
};

const constructorName = (value: unknown) => {
    return Object.getPrototypeOf(value)?.constructor?.name;
};

export function stringifyInternal(
    value: any,
    previousValues: any[],
    getAsyncContent: (
        p: Promise<unknown> | WithAsyncToStringMethod
    ) => AsyncContent,
    options: Required<StringifyOptions>
): string {
    const currentValues = previousValues.concat([value]);

    const strInter = (v: any) => {
        return stringifyInternal(v, currentValues, getAsyncContent, options);
    };

    if (isTypeofObject(value) && previousValues.indexOf(value) !== -1) {
        return '[cyclic]';
    }

    if (hasAsyncToStringMethod(value)) {
        // 如果用户定义了自定义异步序列化函数，我们首先使用它
        const content = getAsyncContent(value);

        if (content.state === 'fulfilled') {
            return content.value as string;
        }
    }

    if (hasToStringMethod(value)) {
        // 如果用户定义了自定义同步序列化函数，我们会在下一个函数之前使用它
        try {
            return value[toStringMethod]();
        } catch {}
    }

    if (isPrototype(value)) {
        return `${(value as any).constructor.name}.prototype`;
    }

    const tag = getTag(value);
    const { nearestDate, errorHandler } = options;

    switch (tag) {
        case 'Null':
        case 'Undefined':
            return `${value}`;

        case 'BigInt':
            return isBigIntPrimitive(value) ? `${value}n` : `Object(${value}n)`;

        case 'Boolean':
            const unboxedToString = (value as any).toString();
            return isBooleanPrimitive(value)
                ? unboxedToString
                : `new Boolean(${unboxedToString})`;

        case 'Number':
            return isNumberPrimitive(value, true)
                ? stringifyNumber(value)
                : `new Number(${stringifyNumber(Number(value))})`;

        case 'String':
            return isStringPrimitive(value)
                ? JSON.stringify(value)
                : `new String(${JSON.stringify(value)})`;

        case 'Symbol': {
            const s = value as unknown as symbol;

            try {
                if (!isUndefined(Symbol.keyFor(s))) {
                    return `Symbol.for(${JSON.stringify(Symbol.keyFor(s))})`;
                }
            } catch {}

            const desc = getSymbolDescription(s);

            if (isNull(desc)) {
                return 'Symbol()';
            }

            const knownSymbol =
                desc.startsWith('Symbol.') &&
                (Symbol as any)[desc.substring(7)];

            return s === knownSymbol ? desc : `Symbol(${JSON.stringify(desc)})`;
        }

        case 'Arguments':
            return strInter(Array.from(value));

        case 'Array': {
            const arr = value as unknown as unknown[];

            if (arr.length >= 50 && isArraySparse(arr)) {
                const assignments: string[] = [];

                for (const index in arr) {
                    if (!Number.isNaN(Number(index)))
                        assignments.push(`${index}:${strInter(arr[index])}`);
                }

                return assignments.length !== 0
                    ? `Object.assign(Array(${arr.length}),{${assignments.join(',')}})`
                    : `Array(${arr.length})`;
            }

            // 对于 [,]，stringifiedArray 的结果是：''
            // 对于 [,,]，stringifiedArray 的结果是：','
            // 对于 [1,,]，stringifiedArray 的结果是：'1,'
            // 对于 [1,,2]，stringifiedArray 的结果是：'1,,2'
            const stringifiedArray = arr.map(v => strInter(v)).join(',');

            return arr.length === 0 || arr.length - 1 in arr
                ? `[${stringifiedArray}]`
                : `[${stringifiedArray},]`;
        }

        case 'Date': {
            const d = value as unknown as Date;
            const t = d.getTime();

            return Number.isNaN(t)
                ? `new Date(NaN)`
                : nearestDate &&
                    Math.floor(Date.now() / 1e3) === Math.floor(t / 1e3)
                  ? 'new Date()'
                  : `new Date(${JSON.stringify(d.toISOString())})`;
        }

        case 'Map':
            return `new Map(${strInter(Array.from(value as any))})`;

        case 'Object': {
            try {
                const toStringAccessor = (value as any).toString;

                if (
                    isFunction(toStringAccessor) &&
                    toStringAccessor !== Object.prototype.toString
                ) {
                    return (value as any).toString();
                }
            } catch (err) {
                // return '[object Object]';
                return errorHandler(err);
            }

            const mapper = (k: string | symbol) =>
                `${
                    k === '__proto__'
                        ? '["__proto__"]'
                        : typeof k === 'symbol'
                          ? `[${strInter(k)}]`
                          : JSON.stringify(k)
                }:${strInter((value as any)[k])}`;

            const stringifiedProperties = [
                ...Object.keys(value as Record<PropertyKey, any>).map(mapper),
                ...Object.getOwnPropertySymbols(value)
                    .filter(s => {
                        const descriptor = Object.getOwnPropertyDescriptor(
                            value,
                            s
                        );
                        return descriptor && descriptor.enumerable;
                    })
                    .map(mapper)
            ];

            const formatted = '{' + stringifiedProperties.join(',') + '}';

            if (Object.getPrototypeOf(value) === null) {
                return formatted === '{}'
                    ? 'Object.create(null)'
                    : `Object.assign(Object.create(null),${formatted})`;
            }

            return formatted;
        }

        case 'Set':
            return `new Set(${strInter(Array.from(value as any))})`;

        case 'Promise': {
            const promiseContent = getAsyncContent(
                value as any as Promise<unknown>
            );

            switch (promiseContent.state) {
                case 'fulfilled':
                    return `Promise.resolve(${strInter(promiseContent.value)})`;

                case 'rejected':
                    return `Promise.reject(${strInter(promiseContent.value)})`;

                case 'pending':
                    return `new Promise(() => { /* pending */ })`;

                case 'unknown':
                default:
                    return `new Promise(() => { /* unknown */ })`;
            }
        }

        case 'DOMException': {
            const s = strInter(value.message);
            return `new ${tag}(${s === '""' ? '' : s})`;
        }

        case 'Error':
        case 'EvalError':
        case 'RangeError':
        case 'ReferenceError':
        case 'SyntaxError':
        case 'TypeError':
        case 'URIError': {
            const s = strInter(value.message);

            if (Object.getPrototypeOf(value).name === 'AggregateError') {
                return `new AggregateError([${value.errors
                    .map((e: Error) => strInter(e))
                    .join(',')}], ${s})`;
            }

            return `new ${Object.getPrototypeOf(value).name}(${s === '""' ? '' : s})`;
        }

        case 'Int8Array':
        case 'Uint8Array':
        case 'Uint8ClampedArray':
        case 'Int16Array':
        case 'Uint16Array':
        case 'Int32Array':
        case 'Uint32Array':
        case 'Float32Array':
        case 'Float64Array':
        case 'BigInt64Array':
        case 'BigUint64Array': {
            if (isBuffer(value)) {
                return `Buffer.from(${strInter(Array.from(value.values()))})`;
            }

            const typedArray = value as unknown as TypedArray;
            const valuesFromTypedArr: IterableIterator<bigint | number> =
                typedArray.values();

            return `${constructorName(value)}.from(${strInter(
                Array.from(valuesFromTypedArr)
            )})`;
        }

        case 'Event':
        case 'CustomEvent': {
            return `new ${constructorName(value)}("${value.type}")`;
        }

        case 'URL':
        case 'URLSearchParams':
            return `new ${constructorName(value)}(${strInter(
                value.toString()
            )})`;
    }

    try {
        return (value as any).toString();
    } catch (err) {
        // return Object.prototype.toString.call(value);
        return errorHandler(err);
    }
}

/**
 * stringify 和 asyncStringify 之间的中间点
 *
 * 如果该值可以以同步方式字符串化，那么它将返回一个字符串。
 * 否则，它会尝试进一步调查并返回 Promise<string>。
 */
export function possiblyAsyncStringify<Ts>(
    value: Ts,
    options: Required<StringifyOptions>
): string | Promise<string> {
    const stillPendingMarker = Symbol();
    const pendingPromisesForCache: Promise<void>[] = [];
    const cache = new Map<unknown, AsyncContent>();

    function createDelay0(): {
        delay: Promise<typeof stillPendingMarker>;
        cancel: () => void;
    } {
        let handleId: ReturnType<typeof setTimeout> | null = null;
        const cancel = () => {
            if (handleId !== null) {
                clearTimeout(handleId);
            }
        };
        const delay = new Promise<typeof stillPendingMarker>(resolve => {
            handleId = setTimeout(() => {
                handleId = null;
                resolve(stillPendingMarker);
            }, 0);
        });

        return { delay, cancel };
    }

    const unknownState = { state: 'unknown', value: undefined } as const;
    const getAsyncContent = function getAsyncContent(
        data: Promise<unknown> | WithAsyncToStringMethod
    ): AsyncContent {
        const cacheKey = data;

        if (cache.has(cacheKey)) {
            return cache.get(cacheKey)!;
        }

        const delay0 = createDelay0();
        const p: Promise<unknown> =
            asyncToStringMethod in data
                ? Promise.resolve().then(() =>
                      (data as WithAsyncToStringMethod)[asyncToStringMethod]()
                  )
                : (data as Promise<unknown>);
        p.catch(() => {});

        pendingPromisesForCache.push(
            Promise.race([p, delay0.delay]).then(
                successValue => {
                    if (successValue === stillPendingMarker)
                        cache.set(cacheKey, {
                            state: 'pending',
                            value: undefined
                        });
                    else
                        cache.set(cacheKey, {
                            state: 'fulfilled',
                            value: successValue
                        });
                    delay0.cancel();
                },
                errorValue => {
                    cache.set(cacheKey, {
                        state: 'rejected',
                        value: errorValue
                    });
                    delay0.cancel();
                }
            )
        );

        cache.set(cacheKey, unknownState);

        return unknownState;
    };

    /**
     * 虽然这个实现对于深度嵌套的 Promise 来说并不是最优的
     * 但对于大多数值来说，通常一个（或两个）循环就足够了
     * 嵌套的 `Promise` 将是一个次优的情况，但考虑到在现实世界中几乎不会发生这种情况
     * 我们可以偶尔为此付出代价
     */
    function loop(): string | Promise<string> {
        const stringifiedValue = stringifyInternal(
            value,
            [],
            getAsyncContent,
            options
        );

        if (pendingPromisesForCache.length === 0) {
            return stringifiedValue;
        }

        return Promise.all(pendingPromisesForCache.splice(0)).then(loop);
    }

    return loop();
}

type StringifyOptions = {
    /** 就近解析日期。默认为 `false` */
    nearestDate?: boolean;

    /** 当出现内部错误时 (例如无法解析的类型)，是直接报错还是返回一个值。默认为抛出错误 */
    errorHandler?: (error: any) => any;
};

/**
 * 将任何值转换为字符串形式
 *
 * 此异步版本还能够深入了解 Promise 的状态
 *
 * @param value 要转换为字符串的值
 * @note
 *
 * - 该方法并不完全可信，可能丢失特定的属性
 * - 如果出现循环引用，则会表示为 `[cyclic]`
 *
 * 已知的不支持的类型:
 * - `ArrayBuffer`
 * - `SharedArrayBuffer`
 * - `DataView`
 * - `WeakMap`
 * - `WeakSet`
 * - `FormData`
 * - `Blob`
 * - `File`
 * - `FileReader`
 * - `DataTransfer`
 */
export function stringify<T>(value: T, options?: StringifyOptions): string {
    const opts = {
        nearestDate: false,
        errorHandler(error: any) {
            throw error;
        },

        ...options
    };

    return stringifyInternal(
        value,
        [],
        () => ({
            state: 'unknown',
            value: undefined
        }),
        opts
    );
}

/**
 * 将任何值转换为字符串形式
 *
 * 此异步版本还能够深入了解 Promise 的状态
 *
 * @param value 要转换为字符串的值
 * @note
 *
 * - 该方法并不完全可信，可能丢失特定的属性
 * - 如果出现循环引用，则会表示为 `[cyclic]`
 *
 * 已知的不支持的类型:
 * - `ArrayBuffer`
 * - `SharedArrayBuffer`
 * - `DataView`
 * - `WeakMap`
 * - `WeakSet`
 * - `FormData`
 * - `Blob`
 * - `File`
 * - `FileReader`
 * - `DataTransfer`
 */
export async function asyncStringify<T>(
    value: T,
    options?: StringifyOptions
): Promise<string> {
    const opts = {
        nearestDate: false,
        errorHandler(error: any) {
            throw error;
        },

        ...options
    };

    return Promise.resolve(possiblyAsyncStringify(value, opts));
}
