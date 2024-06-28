# `@curong/asserts`

`@curong/asserts` 是一个功能全面的检测 `JavaScript` 类型的依赖，可以很方便的检测变量的类型。它们会接收一个参数并返回一个 `boolean` 值。有关详细的用法，请查看 `文档注释`。

### `@curong/asserts` 主要包含以下的方法:

#### `array`

- `assertsArray`: 是不是一个数组
- `assertsArrayFilled`: 是不是一个长度大于 `0` 的数组
- `assertsArrayIndex`: 是不是一个数组的下标索引，它是一个大于或等于 `0` 并且小于或等于数组的最大长度的正整数
- `assertsArrayLike`: 是不是一个类数组 (不包含数组)
- `assertsArrayLikeFilled`: 是不是一个长度大于 `0` 的类数组 (不包含数组)
- `assertsArrayTwoDimensional`: 是不是一个长度大于 `0` 的数组，且每一项的值都是数组 (二维数组)

#### `bigint`

- `assertsBigInt`: 是不是一个 `bigInt` (大数) 或被包装后的 `BigInt` 对象
- `assertsBigIntArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是 `bigInt` (大数) 或被包装后的 `BigInt` 对象
- `assertsBigIntFilled`: 是不是一个大于 `0n` 的 `bigInt` (大数)
- `assertsBigIntObject`: 是不是一个被包装后的 `BigInt` 对象，即 `Object(0n)`
- `assertsBigIntPrimitive`: 是不是一个基本的大数，即 `bigint`

#### `boolean`

- `assertsBoolean`: 是不是一个布尔值或被包装后的布尔值对象
- `assertsBooleanArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是布尔值或被包装后的布尔值对象
- `assertsBooleanObject`: 是不是一个被包装后的布尔值对象，即 `new Boolean`
- `assertsBooleanPrimitive`: 是不是一个基本的布尔值，即 `boolean`
- `assertsFalse`: 是不是 `false`
- `assertsTrue`: 是不是 `true`

#### `buffer`

- `assertsArrayBuffer`: 是不是一个 `ArrayBuffer`
- `assertsArrayBufferView`: 是不是一个 `ArrayBufferView`
- `assertsBigInt64Array`: 是不是一个 `BigInt64Array`，每一项占八个字节，值为 `-2^63 - 2^63-1`
- `assertsBigUint64Array`: 是不是一个 `BigUint64Array`，每一项占八个字节，值为 `0 - 2^64-1`
- `assertsBuffer`: 是不是一个 `Buffer`
- `assertsBufferArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是 `Buffer`
- `assertsBufferFilled`: 是不是一个长度大于 `0` 的 `Buffer`
- `assertsDataView`: 是不是一个 `DataView`
- `assertsFloat32Array`: 是不是一个 `Float32Array`，每一项占四个字节，值为 `-3.4028234663852886e38 - 3.4028234663852886e38`，并且 `1.2e-38` 是最小的正数
- `assertsFloat64Array`: 是不是一个 `Float64Array`，每一项占八个字节，值为 `-1.7976931348623157e308 - 1.7976931348623157e308`，并且 `5e-324` 是最小的正数
- `assertsInt16Array`: 是不是一个 `Int16Array`，每一项占两个字节，值为 `-2^15 - 2^15-1`，即 `-32768 - 32767`
- `assertsInt32Array`: 是不是一个 `Int32Array`，每一项占四个字节，值为 `-2^31 - 2^31-1`，即 `-2147483648 - 2147483647`
- `assertsInt8Array`: 是不是一个 `Int8Array`，每一项占一个字节，值为 `-2^7 - 2^7-1` ，即 `-128 - 127`
- `assertsSharedArrayBuffer`: 是不是一个 `SharedArrayBuffer`
- `assertsTypedArray`: 是不是一个类型化数组 (`TypedArray`)
- `assertsUint16Array`: 是不是一个 `Uint16Array`，每一项占两个字节，值为 `0 - 2^16-1`，即 `0 - 65535`
- `assertsUint32Array`: 是不是一个 `Uint32Array`，每一项占四个字节，值为 `0 - 2^32-1`，即 `0 - 4294967295`
- `assertsUint8Array`: 是不是一个 `Uint8Array`，每一项占一个字节，值为 `0 - 2^8-1`，即 `0 - 255`
- `assertsUint8ClampedArray`: 是不是一个 `Uint8ClampedArray`，每一项占一个字节，值为 `0 - 2^8-1`，即 `0 - 255` (一定在 `0` 到 `255` 之间)


#### `cmp`

- `assertsEqual`: **简单** 的判断多个的值是否相等
- `assertsEvery`: 检查数组中所有元素是否满足给定条件
- `assertsNotEqual`: **简单** 的判断多个的值是否不相等
- `assertsSome`: 检查数组中是否至少有一个元素满足给定的条件

#### `collection`

- `assertsMap`: 是不是一个 `Map`
- `assertsMapFilled`: 是不是一个长度大于 `0` 的 `Map`
- `assertsSet`: 是不是一个 `Set`
- `assertsSetFilled`: 是不是一个长度大于 `0` 的 `Set`
- `assertsWeakMap`: 是不是一个 `WeakMap`
- `assertsWeakRef`: 是不是一个 `WeakRef`
- `assertsWeakSet`: 是不是一个 `WeakSet`

#### `date`

- `assertsDate`: 是不是一个 `Date`
- `assertsDateValid`: 是不是一个有效的 `Date` 数字 (格林威治时间戳) 、字符串 (日期字符串)、数组 (包含年、月、日、时、分、秒、毫秒的数组)、对象 (`Date`)

#### `element`

- `assertsDocument`: 是不是 `Document` 对象
- `assertsElement`: 是不是一个 `Element`
- `assertsHTMLElement`: 是不是一个 `HTMLElement`
- `assertsNodeList`: 是不是一个 `NodeList`
- `assertsReactElement`: 是不是一个 `React` 元素
- `assertsTextNode`: 是不是一个 `TextNode`
- `assertsWindow`: 是不是 `Window` 对象

#### `error`

- `assertsAnyError`: 是不是一个任意的 `Error` 对象
- `assertsError`: 是不是一个 `Error` 对象
- `assertsEvalError`: 是不是一个 `EvalError` 对象
- `assertsRangeError`: 是不是一个 `RangeError` 对象
- `assertsReferenceError`: 是不是一个 `ReferenceError` 对象
- `assertsSameError`: 是不是一个 `name` 和 `message` 相同的 `Error` 对象
- `assertsSyntaxError`: 是不是一个 `SyntaxError` 对象
- `assertsTypeError`: 是不是一个 `TypeError` 对象

#### `event`

- `assertsEvent`: 是不是一个 `Event` 事件

#### `file`

- `assertsBlob`: 是不是一个 `Blob`
- `assertsFile`: 是不是一个 `File` 对象
- `assertsFileList`: 是不是一个 `FileList` 对象
- `assertsFileReader`: 是不是一个 `FileReader` 对象

#### `form`

- `assertsFormData`: 是不是一个 `FormData`

#### `function`

- `assertsArguments`: 是不是函数的形参
- `assertsAsyncFunction`: 是不是一个异步函数
- `assertsAsyncFunctionFilled`: 是不是一个参数个数大于 `0` 的异步函数
- `assertsClass`: 是不是一个类
- `assertsFunction`: 是不是一个函数 (包含同步函数、异步函数、`Generator` 函数 ...)
- `assertsFunctionArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是函数
- `assertsFunctionBound`: 是不是一个经过 `.bind()` 所绑定过的函数
- `assertsFunctionFilled`: 是不是一个参数个数大于 `0` 的函数
- `assertsNativeFunction`: 是不是一个 `JavaScript` 内置函数
- `assertsSyncFunction`: 是不是一个同步函数
- `assertsSyncFunctionFilled`: 是不是一个参数个数大于 `0` 的同步函数

#### `generator`

- `assertsAsyncGenerator`: 是不是一个异步的 `Generator`
- `assertsAsyncGeneratorFunction`: 是不是一个异步的 `Generator` 函数
- `assertsGenerator`: 是不是一个 `Generator`
- `assertsGeneratorFunction`: 是不是一个 `Generator` 函数
- `assertsSyncGenerator`: 是不是一个同步的 `Generator`
- `assertsSyncGeneratorFunction`: 是不是一个同步的 `Generator` 函数

#### `iterator`

- `assertsAsyncIterable`: 是不是一个异步可迭代的对象
- `assertsIterable`: 是不是一个同步或异步的可迭代的对象
- `assertsIterator`: 是不是一个 `Iterator`
- `assertsSyncIterable`: 是不是一个同步可迭代的对象

#### `nullable`

- `assertsNull`: 是不是 `null`
- `assertsNullArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是 `null`
- `assertsNullOrUndefined`: 是不是 `undefined` 或者 `null`
- `assertsNullOrUndefinedArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是 `null` 或 `undefined`
- `assertsUndefined`: 是不是 `undefined`
- `assertsUndefinedArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是 `undefined`

#### `number`

- `assertsFinite`: 是不是一个不是 `Infinity`、`-Infinity` 或 `NaN` 的有限数
- `assertsFloat`: 是不是一个浮点数，即不是整数的数
- `assertsFloat16`: 是不是一个半精度浮点数，取值在 `-65504 - 65504` 之间的浮点数
- `assertsFloat16SafeInt`: 是不是一个可以被半精度浮点数所能存储的整数，即 `2^11-1`，取值范围为 `-2047 - 2047`
- `assertsFloat32`: 是不是一个单精度浮点数，取值在 `-3.4028234663852886e38 - 3.4028234663852886e38` 之间的浮点数
- `assertsFloat32SafeInt`: 是不是一个可以被单精度浮点数所能存储的整数，即 `2^24-1`，取值范围为 `-16777215 - 16777215`
- `assertsFloat64`: 是不是一个双精度浮点数，取值在 `-1.7976931348623157e308 - 1.7976931348623157e308` 之间的浮点数
- `assertsFloat64SafeInt`: 是不是一个可以被双精度浮点数所能存储的整数，即 `2^53-1`，取值范围为 `-9007199254740991 - 9007199254740991`
- `assertsInfinity`: 是不是一个无穷大的数
- `assertsInfinityNegative`: 是不是一个 `-Infinity`，即负无穷大的数
- `assertsInfinityPositive`: 是不是一个 `Infinity`，即正无穷大的数
- `assertsInt`: 是不是一个整数
- `assertsInt16`: 是不是一个 `int16`，取值范围为 `-2^15 - 2^15-1` 的整数，即 `-32768 - 32767`
- `assertsInt32`: 是不是一个 `int32`，取值范围为 `-2^31 - 2^31-1` 的整数，即 `-2147483648 - 2147483647`
- `assertsInt8`: 是不是一个 `int8`，取值范围为 `-2^7 - 2^7-1` 的整数，即 `-128 - 127`
- `assertsIntEven`: 是不是一个偶数，即取模后等于 `0` 的整数
- `assertsIntFilled`: 是不是一个大于 `0` 的整数，即无符号整数
- `assertsIntOdd`: 是不是一个奇数，即取模后等于 `1` 的整数
- `assertsIntSafe`: 是不是一个安全的整数
- `assertsNaN`: 是不是一个 `NaN`
- `assertsNumber`: 是不是一个数字或被包装后的数字对象
- `assertsNumberArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是数字或被包装后的数字对象
- `assertsNumberFilled`: 是不是一个不是 `0`、`Infinity`、`-Infinity` 或 `NaN` 的数字
- `assertsNumberNegative`: 是不是一个小于 `0` 且不是 `-Infinity` 或 `NaN` 的负数
- `assertsNumberObject`: 是不是一个被包装后的数字对象，即 `new Number()` || `Object(0)`
- `assertsNumberPositive`: 是不是一个大于 `0` 且不是 `Infinity` 或 `NaN` 的正数
- `assertsNumberPrimitive`: 是不是一个基本的数字，即 `number` || `Number()`
- `assertsNumberSafe`: 是不是一个可以安全计算的数字
- `assertsNumberValid`: 是不是一个可以转换为有效的数字的值
- `assertsUFloat`: 是不是一个无符号浮点数，即大于 `0` 的浮点数
- `assertsUint`: 是不是一个无符号整数，即大于或等于 `0` 的整数
- `assertsUint16`: 是不是一个 `uint16`，取值范围为 `0 - 2^16-1` 的正整数，即 `0 - 65535`
- `assertsUint32`: 是不是一个 `uint32`，取值范围为 `0 - 2^32-1` 的正整数，即 `0 - 4294967295`
- `assertsUint8`: 是不是一个 `uint8`，取值范围为 `0 - 2^8-1` 的正整数，即 `0 - 255`
- `assertsUintFilled`: 是不是一个大于 `0` 的无符号整数
- `assertsUintSafe`: 是不是一个安全的无符号整数
- `assertsUintSafeFilled`: 是不是一个大于 `0` 的安全的无符号整数
- `assertsZero`: 是不是 `0`

#### `object`

- `assertsObject`: 是不是一个 `[object Object]` 的对象
- `assertsObjectArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是标记为 `[object Object]` 的对象
- `assertsObjectFilled`: 是不是一个属性个数大于 `0` 的对象
- `assertsPlainObject`: 是不是一个普通对象，即 `{}`，该对象的原型指向 `Object.prototype`
- `assertsPlainObjectFilled`: 是不是一个属性个数大于 `0` 的普通对象，即 `{}`
- `assertsPureObject`: 是不是一个纯对象，即通过 `Object.create(null)` 创建的对象，该对象的原型就是 `null`
- `assertsTypeofObject`: 使用 `typeof` 判断是不是一个不是 `null` 的任意对象
- `assertsTypeofObjectArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是对象 (通过 `typeof` 判断且不为 `null`)

#### `platform`

- `assertsBrowser`: 当前的执行环境是不是浏览器
- `assertsDeno`: 当前的执行环境是不是 `Deno`
- `assertsNodejs`: 当前的执行环境是不是 `Node.js`
- `assertsWebWorker`: 当前的执行环境是不是 `Web Worker`

#### `primitive`

- `assertsFalsy`: 是不是一个虚值 (强制转换为 `Boolean` 后为 `false` 的值)
- `assertsFalsyArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是虚值 (强制转换为 `Boolean` 后为 `false` 的值)
- `assertsPrimitive`: 是不是一个基本类型的值
- `assertsTruthy`: 是不是一个真值 (强制转换为 `Boolean` 后为 `true` 的值)
- `assertsTruthyArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是真值 (强制转换为 `Boolean` 后为 `true` 的值)

#### `promise`

- `assertsPromise`: 是不是一个 `Promise`
- `assertsPromiseLike`: 是不是一个有 `then` 方法的像 `Promise` 的对象或函数

#### `property`

- `assertsLengthy`: 是不是一个具有 `length` 属性的类型，其 `length` 的值是一个大于或等于 `0` 的安全的无符号整数
- `assertsLengthyFilled`: 是不是一个具有 `length` 属性的类型，其 `length` 的值是一个大于 `0` 的安全的无符号整数
- `assertsOwnProperty`: 确定一个值上是否具有指定名称的私有属性
- `assertsProperty`: 确定一个值上是否具有指定名称的属性，该属性可以是私有属性，也可以是原型上的属性
- `assertsPropertyDescriptor`: 是不是一个属性描述器
- `assertsPropertyKey`: 是不是一个可以作为属性的值
- `assertsSizey`: 是不是一个具有 `size` 属性的类型，其 `size` 的值是一个大于或等于 `0` 的安全的无符号整数
- `assertsSizeyFilled`: 是不是一个具有 `size` 属性的类型，其 `size` 的值是一个大于 `0` 的安全的无符号整数

#### `regexp`

- `assertsRegExp`: 是不是一个正则表达式

#### `stream`

- `assertsDuplex`: 是不是一个双工流
- `assertsReadable`: 是不是一个可读流
- `assertsStream`: 是不是一个流
- `assertsTransform`: 是不是一个转换流
- `assertsWritable`: 是不是一个可写流

#### `string`

- `assertsString`: 是不是一个字符串或被包装后的字符串对象
- `assertsStringArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是字符串或被包装后的字符串对象
- `assertsStringFilled`: 是不是一个长度大于 `0` 的字符串
- `assertsStringObject`: 是不是一个被包装后的字符串对象，即 `new String()`
- `assertsStringPrimitive`: 是不是一个基本的字符串，即 `string`
- `assertsStringTrim`: 是不是一个经过 `trim` 后长度大于指定长度的字符串

#### `symbol`

- `assertsSymbol`: 是不是一个 `symbol` 或被包装后的 `Symbol` 对象
- `assertsSymbolArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是 `symbol` 或被包装后的 `Symbol` 对象
- `assertsSymbolObject`: 是不是一个被包装后的 `Symbol` 对象，即 `Object(Symbol())`
- `assertsSymbolPrimitive`: 是不是一个基本的 `symbol` || `Symbol()`

#### `type`

- `assertTagEqual`: 判断原型上的类型标记是否等于某个值
- `assertTypeofEqual`: 判断一个值的类型是否与指定的类型字符串相等

#### `url`

- `assertsURL`: 是不是一个 `URL`
- `assertsURLSearchParams`: 是不是一个 `URLSearchParams`
- `assertsURLString`: 是不是一个可以转换为 `URL` 对象的的字符串

#### `variable`

- `assertsVarName`: 是不是可以把值当做 `JavaScript` 的变量名
