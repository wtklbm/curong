# `@curong/types`

`@curong/types` 是一个功能全面的检测 `JavaScript` 类型的依赖，可以很方便的检测变量的类型。它们会接收一个参数并返回一个 `boolean` 值。有关详细的用法，请查看 `文档注释`。

### `@curong/types` 主要包含以下的方法:

#### `array`

- `isArray`: 是不是一个数组
- `isArrayFilled`: 是不是一个长度大于 `0` 的数组
- `isArrayIndex`: 是不是一个数组的下标索引，它是一个大于或等于 `0` 并且小于或等于数组的最大长度的正整数
- `isArrayLike`: 是不是一个类数组 (包括稀疏的类数组，不包含数组和稀疏数组)
- `isArrayLikeFilled`: 是不是一个长度大于 `0` 的类数组 (不包含数组)
- `isArraySparse`: 是不是一个稀疏数组 (不包含稀疏的类数组)
- `isArrayTwoDimensional`: 是不是一个长度大于 `0` 的数组，且每一项的值都是数组 (二维数组)

#### `bigint`

- `isBigInt`: 是不是一个 `bigInt` (大数) 或被包装后的 `BigInt` 对象
- `isBigIntArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是 `bigInt` (大数) 或被包装后的 `BigInt` 对象
- `isBigIntFilled`: 是不是一个大于 `0n` 的 `bigInt` (大数)
- `isBigIntObject`: 是不是一个被包装后的 `BigInt` 对象，即 `Object()`
- `isBigIntPrimitive`: 是不是一个基本的大数，即 `bigint` || `BigInt()`

#### `boolean`

- `isBoolean`: 是不是一个布尔值或被包装后的布尔值对象
- `isBooleanArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是布尔值或被包装后的布尔值对象
- `isBooleanObject`: 是不是一个被包装后的布尔值对象，即 `new Boolean`
- `isBooleanPrimitive`: 是不是一个基本的布尔值，即 `boolean`
- `isFalse`: 是不是 `false`
- `isTrue`: 是不是 `true`

#### `buffer`

- `isArrayBuffer`: 是不是一个 `ArrayBuffer`
- `isArrayBufferView`: 是不是一个 `ArrayBufferView`
- `isBigInt64Array`: 是不是一个 `BigInt64Array`，每一项占八个字节，值为 `-2^63 - 2^63-1`
- `isBigUint64Array`: 是不是一个 `BigUint64Array`，每一项占八个字节，值为 `0 - 2^64-1`
- `isBuffer`: 是不是一个 `Buffer`
- `isBufferArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是 `Buffer`
- `isBufferFilled`: 是不是一个长度大于 `0` 的 `Buffer`
- `isDataView`: 是不是一个 `DataView`
- `isFloat32Array`: 是不是一个 `Float32Array`，每一项占四个字节，值为 `-3.4028234663852886e38 - 3.4028234663852886e38`，并且 `1.2e-38` 是最小的正数
- `isFloat64Array`: 是不是一个 `Float64Array`，每一项占八个字节，值为 `-1.7976931348623157e308 - 1.7976931348623157e308`，并且 `5e-324` 是最小的正数
- `isInt16Array`: 是不是一个 `Int16Array`，每一项占两个字节，值为 `-2^15 - 2^15-1`，即 `-32768 - 32767`
- `isInt32Array`: 是不是一个 `Int32Array`，每一项占四个字节，值为 `-2^31 - 2^31-1`，即 `-2147483648 - 2147483647`
- `isInt8Array`: 是不是一个 `Int8Array`，每一项占一个字节，值为 `-2^7 - 2^7-1` ，即 `-128 - 127`
- `isSharedArrayBuffer`: 是不是一个 `SharedArrayBuffer`
- `isTypedArray`: 是不是一个类型化数组 (`TypedArray`)
- `isUint16Array`: 是不是一个 `Uint16Array`，每一项占两个字节，值为 `0 - 2^16-1`，即 `0 - 65535`
- `isUint32Array`: 是不是一个 `Uint32Array`，每一项占四个字节，值为 `0 - 2^32-1`，即 `0 - 4294967295`
- `isUint8Array`: 是不是一个 `Uint8Array`，每一项占一个字节，值为 `0 - 2^8-1`，即 `0 - 255`
- `isUint8ClampedArray`: 是不是一个 `Uint8ClampedArray`，每一项占一个字节，值为 `0 - 2^8-1`，即 `0 - 255` (一定在 `0` 到 `255` 之间)


包含以下类型:

- `ArrayBufferView`: 一个包含 `DataView` 和任何 `TypedArray` 类型的集合类型
- `TypedArray`: 底层二进制数据缓冲区的类数组视图

#### `cmp`

- `isEqual`: **简单** 的判断多个的值是否相等
- `isEvery`: 检查数组中所有元素是否满足给定条件
- `isNotEqual`: **简单** 的判断多个的值是否不相等
- `isSome`: 检查数组中是否至少有一个元素满足给定的条件

#### `collection`

- `isMap`: 是不是一个 `Map`
- `isMapFilled`: 是不是一个长度大于 `0` 的 `Map`
- `isSet`: 是不是一个 `Set`
- `isSetFilled`: 是不是一个长度大于 `0` 的 `Set`
- `isWeakMap`: 是不是一个 `WeakMap`
- `isWeakRef`: 是不是一个 `WeakRef`
- `isWeakSet`: 是不是一个 `WeakSet`

#### `date`

- `isDate`: 是不是一个 `Date`
- `isDateValid`: 是不是一个有效的 `Date` 数字 (格林威治时间戳) 、字符串 (日期字符串)、数组 (包含年、月、日、时、分、秒、毫秒的数组)、对象 (`Date`)
- `isLeapYear`: 是不是一个闰年年份

#### `element`

- `isDocument`: 是不是 `Document` 对象
- `isElement`: 是不是一个 `Element`
- `isHTMLElement`: 是不是一个 `HTMLElement`
- `isNodeList`: 是不是一个 `NodeList`
- `isReactElement`: 是不是一个 `React` 元素
- `isTextNode`: 是不是一个 `TextNode`
- `isWindow`: 是不是 `Window` 对象

#### `error`

- `isAggregateError`: 是不是一个 `AggregateError` 对象
- `isAnyError`: 是不是一个任意的 `Error` 对象
- `isDOMException`: 是不是一个 `DOMException` 对象
- `isError`: 是不是一个 `Error` 对象
- `isErrorLike`: 是不是一个类错误对象
- `isEvalError`: 是不是一个 `EvalError` 对象
- `isRangeError`: 是不是一个 `RangeError` 对象
- `isReferenceError`: 是不是一个 `ReferenceError` 对象
- `isSameError`: 是不是一个 `name` 和 `message` 相同的 `Error` 对象
- `isSyntaxError`: 是不是一个 `SyntaxError` 对象
- `isTypeError`: 是不是一个 `TypeError` 对象
- `isURIError`: 是不是一个 `isURIError` 对象

#### `event`

- `isEvent`: 是不是一个 `Event` 事件

#### `file`

- `isBlob`: 是不是一个 `Blob`
- `isFile`: 是不是一个 `File` 对象
- `isFileList`: 是不是一个 `FileList` 对象
- `isFileReader`: 是不是一个 `FileReader` 对象

#### `form`

- `isFormData`: 是不是一个 `FormData`

#### `function`

- `isArguments`: 是不是函数的形参
- `isAsyncFunction`: 是不是一个异步函数
- `isAsyncFunctionFilled`: 是不是一个参数个数大于 `0` 的异步函数
- `isClass`: 是不是一个类
- `isFunction`: 是不是一个函数 (包含同步函数、异步函数、`Generator` 函数 ...)
- `isFunctionArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是函数
- `isFunctionBound`: 是不是一个经过 `.bind()` 所绑定过的函数
- `isFunctionFilled`: 是不是一个参数个数大于 `0` 的函数
- `isNativeFunction`: 是不是一个 `JavaScript` 内置函数
- `isSyncFunction`: 是不是一个同步函数
- `isSyncFunctionFilled`: 是不是一个参数个数大于 `0` 的同步函数

包含以下类型:

- `AsyncFunction`: 异步函数的类型定义
- `Class`: 类的类型定义
- `Function`: 函数的类型定义

#### `generator`

- `isAsyncGenerator`: 是不是一个异步的 `Generator`
- `isAsyncGeneratorFunction`: 是不是一个异步的 `Generator` 函数
- `isGenerator`: 是不是一个 `Generator`
- `isGeneratorFunction`: 是不是一个 `Generator` 函数
- `isSyncGenerator`: 是不是一个同步的 `Generator`
- `isSyncGeneratorFunction`: 是不是一个同步的 `Generator` 函数

#### `iterator`

- `isAsyncIterable`: 是不是一个异步可迭代的对象
- `isIterable`: 是不是一个同步或异步的可迭代的对象
- `isIterator`: 是不是一个 `Iterator`
- `isSyncIterable`: 是不是一个同步可迭代的对象

包含以下类型:

- `AsyncIterable`: 异步可迭代的类型
- `SyncIterable`: 同步可迭代的类型


#### `nullable`

- `isNull`: 是不是 `null`
- `isNullArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是 `null`
- `isNullOrUndefined`: 是不是 `undefined` 或者 `null`
- `isNullOrUndefinedArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是 `null` 或 `undefined`
- `isUndefined`: 是不是 `undefined`
- `isUndefinedArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是 `undefined`

包含以下类型:

- `IsNullable`: 是不是一个 `null` 或 `undefined` 类型的值
- `NonNull`: 从给定类型中排除 `null` 类型
- `NonNullOrUndefined`: 从给定类型中排除 `null` 和 `undefined` 类型 (`NonNullable` 的别名)
- `NonUndefined`: 从给定类型中排除 `undefined` 类型

#### `number`

- `isFinite`: 是不是一个不是 `Infinity`、`-Infinity` 或 `NaN` 的有限数
- `isFloat`: 是不是一个浮点数，即不是整数的数
- `isFloat16`: 是不是一个半精度浮点数，取值在 `-65504 - 65504` 之间的浮点数
- `isFloat16SafeInt`: 是不是一个可以被半精度浮点数所能存储的整数，即 `2^11-1`，取值范围为 `-2047 - 2047`
- `isFloat32`: 是不是一个单精度浮点数，取值在 `-3.4028234663852886e38 - 3.4028234663852886e38` 之间的浮点数
- `isFloat32SafeInt`: 是不是一个可以被单精度浮点数所能存储的整数，即 `2^24-1`，取值范围为 `-16777215 - 16777215`
- `isFloat64`: 是不是一个双精度浮点数，取值在 `-1.7976931348623157e308 - 1.7976931348623157e308` 之间的浮点数
- `isFloat64SafeInt`: 是不是一个可以被双精度浮点数所能存储的整数，即 `2^53-1`，取值范围为 `-9007199254740991 - 9007199254740991`
- `isInfinity`: 是不是一个无穷大的数
- `isInfinityNegative`: 是不是一个 `-Infinity`，即负无穷大的数
- `isInfinityPositive`: 是不是一个 `Infinity`，即正无穷大的数
- `isInt`: 是不是一个整数
- `isInt16`: 是不是一个 `int16`，取值范围为 `-2^15 - 2^15-1` 的整数，即 `-32768 - 32767`
- `isInt32`: 是不是一个 `int32`，取值范围为 `-2^31 - 2^31-1` 的整数，即 `-2147483648 - 2147483647`
- `isInt8`: 是不是一个 `int8`，取值范围为 `-2^7 - 2^7-1` 的整数，即 `-128 - 127`
- `isIntEven`: 是不是一个偶数，即取模后等于 `0` 的整数
- `isIntFilled`: 是不是一个大于 `0` 的整数，即无符号整数
- `isIntOdd`: 是不是一个奇数，即取模后等于 `1` 的整数
- `isIntSafe`: 是不是一个安全的整数
- `isNaN`: 是不是一个 `NaN`
- `isNumber`: 是不是一个数字或被包装后的数字对象
- `isNumberArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是数字或被包装后的数字对象
- `isNumberFilled`: 是不是一个不是 `0`、`Infinity`、`-Infinity` 或 `NaN` 的数字
- `isNumberNegative`: 是不是一个小于 `0` 且不是 `-Infinity` 或 `NaN` 的负数
- `isNumberObject`: 是不是一个被包装后的数字对象，即 `new Number()` || `Object(0)`
- `isNumberPositive`: 是不是一个大于 `0` 且不是 `Infinity` 或 `NaN` 的正数
- `isNumberPrimitive`: 是不是一个基本的数字，即 `number` || `Number()`
- `isNumberSafe`: 是不是一个可以安全计算的数字
- `isNumberValid`: 是不是一个可以转换为有效的数字的值
- `isPrimeNumber`: 是不是一个质数 (素数)
- `isUFloat`: 是不是一个无符号浮点数，即大于 `0` 的浮点数
- `isUint`: 是不是一个无符号整数，即大于或等于 `0` 的整数
- `isUint16`: 是不是一个 `uint16`，取值范围为 `0 - 2^16-1` 的正整数，即 `0 - 65535`
- `isUint32`: 是不是一个 `uint32`，取值范围为 `0 - 2^32-1` 的正整数，即 `0 - 4294967295`
- `isUint8`: 是不是一个 `uint8`，取值范围为 `0 - 2^8-1` 的正整数，即 `0 - 255`
- `isUintFilled`: 是不是一个大于 `0` 的无符号整数
- `isUintSafe`: 是不是一个安全的无符号整数
- `isUintSafeFilled`: 是不是一个大于 `0` 的安全的无符号整数
- `isZero`: 是不是 `0`

#### `object`

- `isObject`: 是不是一个 `[object Object]` 的对象
- `isObjectArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是标记为 `[object Object]` 的对象
- `isObjectFilled`: 是不是一个属性个数大于 `0` 的对象
- `isPlainObject`: 是不是一个普通对象，即 `{}`，该对象的原型指向 `Object.prototype`
- `isPlainObjectFilled`: 是不是一个属性个数大于 `0` 的普通对象，即 `{}`
- `isPureObject`: 是不是一个纯对象，即通过 `Object.create(null)` 创建的对象，该对象的原型就是 `null`
- `isTypeofObject`: 使用 `typeof` 判断是不是一个不是 `null` 的任意对象
- `isTypeofObjectArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是对象 (通过 `typeof` 判断且不为 `null`)

#### `platform`

- `isBrowser`: 当前的执行环境是不是浏览器
- `isDeno`: 当前的执行环境是不是 `Deno`
- `isNodejs`: 当前的执行环境是不是 `Node.js`
- `isWebWorker`: 当前的执行环境是不是 `Web Worker`

#### `primitive`

- `isFalsy`: 是不是一个虚值 (强制转换为 `Boolean` 后为 `false` 的值)
- `isFalsyArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是虚值 (强制转换为 `Boolean` 后为 `false` 的值)
- `isPrimitive`: 是不是一个基本类型的值
- `isTruthy`: 是不是一个真值 (强制转换为 `Boolean` 后为 `true` 的值)
- `isTruthyArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是真值 (强制转换为 `Boolean` 后为 `true` 的值)

包含以下类型:

- `Falsy`: 一个虚值 (强制转换为 `Boolean` 后为 `false` 的值) 的类型
- `Primitive`: 基本类型的类型定义
- `Truthy`: 一个真值 (强制转换为 `Boolean` 后为 `true` 的值) 的类型

#### `promise`

- `isPromise`: 是不是一个 `Promise`
- `isPromiseLike`: 是不是一个有 `then` 方法的像 `Promise` 的对象或函数

#### `property`

- `isLengthy`: 是不是一个具有 `length` 属性的类型，其 `length` 的值是一个大于或等于 `0` 的安全的无符号整数
- `isLengthyFilled`: 是不是一个具有 `length` 属性的类型，其 `length` 的值是一个大于 `0` 的安全的无符号整数
- `isOwnProperty`: 确定一个值上是否具有指定名称的私有属性
- `isProperty`: 确定一个值上是否具有指定名称的属性，该属性可以是私有属性，也可以是原型上的属性
- `isPropertyDescriptor`: 是不是一个属性描述器
- `isPropertyKey`: 是不是一个可以作为属性的值
- `isPrototype`: 是不是一个构造函数的原型对象
- `isSizey`: 是不是一个具有 `size` 属性的类型，其 `size` 的值是一个大于或等于 `0` 的安全的无符号整数
- `isSizeyFilled`: 是不是一个具有 `size` 属性的类型，其 `size` 的值是一个大于 `0` 的安全的无符号整数

包含以下类型:

- `Lengthy`: 具有 `length` 属性的值的类型定义
- `Sizey`: 具有 `size` 属性的值的类型定义

#### `regexp`

- `isRegExp`: 是不是一个正则表达式

#### `stream`

- `isDuplex`: 是不是一个双工流
- `isReadable`: 是不是一个可读流
- `isStream`: 是不是一个流
- `isTransform`: 是不是一个转换流
- `isWritable`: 是不是一个可写流

#### `string`

- `isChar`: 是不是单个字符
- `isString`: 是不是一个字符串或被包装后的字符串对象
- `isStringArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是字符串或被包装后的字符串对象
- `isStringFilled`: 是不是一个长度大于 `0` 的字符串
- `isStringObject`: 是不是一个被包装后的字符串对象，即 `new String()`
- `isStringPrimitive`: 是不是一个基本的字符串，即 `string`
- `isStringTrim`: 是不是一个经过 `trim` 后长度大于指定长度的字符串

#### `symbol`

- `isSymbol`: 是不是一个 `symbol` 或被包装后的 `Symbol` 对象
- `isSymbolArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是 `symbol` 或被包装后的 `Symbol` 对象
- `isSymbolObject`: 是不是一个被包装后的 `Symbol` 对象，即 `Object(Symbol())`
- `isSymbolPrimitive`: 是不是一个基本的 `symbol` || `Symbol()`

#### `type`

- `getTag`: 判断原型上的类型标记是否等于某个值
- `getTagEqual`: 获取原型上的类型标记
- `typeofEqual`: 判断一个值的类型是否与指定的类型字符串相等

#### `url`

- `isURL`: 是不是一个 `URL` 对象
- `isURLSearchParams`: 是不是一个 `URLSearchParams`
- `isURLString`: 是不是一个可以转换为 `URL` 对象的的字符串

#### `variable`

- `isVarName`: 是不是可以把值当做 `JavaScript` 的变量名


### 一些 TypeScript 类型

- `IsAny`: 是不是一个 `any` 类型的值
- `IsNever`: 是不是一个 `never` 类型的值
- `IsUnknown`: 是不是一个 `unknown` 类型的值
- `WithNull`: 包含指定类型 `T` 或 `null` 的类型
- `WithNullOrUndefined`: 包含指定类型 `T`、`null` 或 `undefined` 的类型
- `WithUndefined`: 包含指定类型 `T` 或 `undefined` 的类型
