# `@curong/asserts`

`@curong/asserts` 是一个功能全面的检测 `JavaScript` 类型的依赖，可以很方便的检测变量的类型。它们会接收一个参数并返回一个 `boolean` 值。有关详细的用法，请查看 `文档注释`。

### `@curong/asserts` 主要包含以下的方法:

#### `array`

- `assertArray`: 是不是一个数组
- `assertArrayFilled`: 是不是一个长度大于 `0` 的数组
- `assertArrayIndex`: 是不是一个数组的下标索引，它是一个大于或等于 `0` 并且小于或等于数组的最大长度的正整数
- `assertArrayLike`: 是不是一个类数组 (包括稀疏的类数组，不包含数组和稀疏数组)
- `assertArrayLikeFilled`: 是不是一个长度大于 `0` 的类数组 (不包含数组)
- `assertArraySparse`: 是不是一个稀疏数组 (不包含稀疏的类数组)
- `assertArrayTwoDimensional`: 是不是一个长度大于 `0` 的数组，且每一项的值都是数组 (二维数组)

#### `bigint`

- `assertBigInt`: 是不是一个 `bigInt` (大数) 或被包装后的 `BigInt` 对象
- `assertBigIntArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是 `bigInt` (大数) 或被包装后的 `BigInt` 对象
- `assertBigIntFilled`: 是不是一个大于 `0n` 的 `bigInt` (大数)
- `assertBigIntObject`: 是不是一个被包装后的 `BigInt` 对象，即 `Object()`
- `assertBigIntPrimitive`: 是不是一个基本的大数，即 `bigint` || `BigInt()`

#### `boolean`

- `assertBoolean`: 是不是一个布尔值或被包装后的布尔值对象
- `assertBooleanArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是布尔值或被包装后的布尔值对象
- `assertBooleanObject`: 是不是一个被包装后的布尔值对象，即 `new Boolean`
- `assertBooleanPrimitive`: 是不是一个基本的布尔值，即 `boolean`
- `assertFalse`: 是不是 `false`
- `assertTrue`: 是不是 `true`

#### `buffer`

- `assertArrayBuffer`: 是不是一个 `ArrayBuffer`
- `assertArrayBufferView`: 是不是一个 `ArrayBufferView`
- `assertBigInt64Array`: 是不是一个 `BigInt64Array`，每一项占八个字节，值为 `-2^63 - 2^63-1`
- `assertBigUint64Array`: 是不是一个 `BigUint64Array`，每一项占八个字节，值为 `0 - 2^64-1`
- `assertBuffer`: 是不是一个 `Buffer`
- `assertBufferArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是 `Buffer`
- `assertBufferFilled`: 是不是一个长度大于 `0` 的 `Buffer`
- `assertDataView`: 是不是一个 `DataView`
- `assertFloat32Array`: 是不是一个 `Float32Array`，每一项占四个字节，值为 `-3.4028234663852886e38 - 3.4028234663852886e38`，并且 `1.2e-38` 是最小的正数
- `assertFloat64Array`: 是不是一个 `Float64Array`，每一项占八个字节，值为 `-1.7976931348623157e308 - 1.7976931348623157e308`，并且 `5e-324` 是最小的正数
- `assertInt16Array`: 是不是一个 `Int16Array`，每一项占两个字节，值为 `-2^15 - 2^15-1`，即 `-32768 - 32767`
- `assertInt32Array`: 是不是一个 `Int32Array`，每一项占四个字节，值为 `-2^31 - 2^31-1`，即 `-2147483648 - 2147483647`
- `assertInt8Array`: 是不是一个 `Int8Array`，每一项占一个字节，值为 `-2^7 - 2^7-1` ，即 `-128 - 127`
- `assertSharedArrayBuffer`: 是不是一个 `SharedArrayBuffer`
- `assertTypedArray`: 是不是一个类型化数组 (`TypedArray`)
- `assertUint16Array`: 是不是一个 `Uint16Array`，每一项占两个字节，值为 `0 - 2^16-1`，即 `0 - 65535`
- `assertUint32Array`: 是不是一个 `Uint32Array`，每一项占四个字节，值为 `0 - 2^32-1`，即 `0 - 4294967295`
- `assertUint8Array`: 是不是一个 `Uint8Array`，每一项占一个字节，值为 `0 - 2^8-1`，即 `0 - 255`
- `assertUint8ClampedArray`: 是不是一个 `Uint8ClampedArray`，每一项占一个字节，值为 `0 - 2^8-1`，即 `0 - 255` (一定在 `0` 到 `255` 之间)


#### `cmp`

- `assertEqual`: **简单** 的判断多个的值是否相等
- `assertEvery`: 检查数组中所有元素是否满足给定条件
- `assertNotEqual`: **简单** 的判断多个的值是否不相等
- `assertSome`: 检查数组中是否至少有一个元素满足给定的条件

#### `collection`

- `assertMap`: 是不是一个 `Map`
- `assertMapFilled`: 是不是一个长度大于 `0` 的 `Map`
- `assertSet`: 是不是一个 `Set`
- `assertSetFilled`: 是不是一个长度大于 `0` 的 `Set`
- `assertWeakMap`: 是不是一个 `WeakMap`
- `assertWeakRef`: 是不是一个 `WeakRef`
- `assertWeakSet`: 是不是一个 `WeakSet`

#### `date`

- `assertDate`: 是不是一个 `Date`
- `assertDateValid`: 是不是一个有效的 `Date` 数字 (格林威治时间戳) 、字符串 (日期字符串)、数组 (包含年、月、日、时、分、秒、毫秒的数组)、对象 (`Date`)
- `isLeapYear`: 是不是一个闰年年份

#### `element`

- `assertDocument`: 是不是 `Document` 对象
- `assertElement`: 是不是一个 `Element`
- `assertHTMLElement`: 是不是一个 `HTMLElement`
- `assertNodeList`: 是不是一个 `NodeList`
- `assertReactElement`: 是不是一个 `React` 元素
- `assertTextNode`: 是不是一个 `TextNode`
- `assertWindow`: 是不是 `Window` 对象

#### `error`

- `assertAggregateError`: 是不是一个任意的 `AggregateError` 对象
- `assertAnyError`: 是不是一个任意的 `Error` 对象
- `assertDOMException`: 是不是一个 `DOMException` 对象
- `assertError`: 是不是一个 `Error` 对象
- `assertErrorLike`: 是不是一个类错误对象
- `assertEvalError`: 是不是一个 `EvalError` 对象
- `assertRangeError`: 是不是一个 `RangeError` 对象
- `assertReferenceError`: 是不是一个 `ReferenceError` 对象
- `assertSameError`: 是不是一个 `name` 和 `message` 相同的 `Error` 对象
- `assertSyntaxError`: 是不是一个 `SyntaxError` 对象
- `assertTypeError`: 是不是一个 `TypeError` 对象
- `assertURIError`: 是不是一个 `URIError` 对象

#### `event`

- `assertEvent`: 是不是一个 `Event` 事件

#### `file`

- `assertBlob`: 是不是一个 `Blob`
- `assertFile`: 是不是一个 `File` 对象
- `assertFileList`: 是不是一个 `FileList` 对象
- `assertFileReader`: 是不是一个 `FileReader` 对象

#### `form`

- `assertFormData`: 是不是一个 `FormData`

#### `function`

- `assertArguments`: 是不是函数的形参
- `assertClass`: 是不是一个类

##### `arrow-function`

- `assertArrowFunction`: 是不是一个箭头函数 (包含同步箭头函数、异步箭头函数)
- `assertArrowFunctionArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是箭头函数
- `assertArrowFunctionFilled`: 是不是一个参数个数大于 `0` 的箭头函数 (包含同步箭头函数、异步箭头函数)
- `assertAsyncArrowFunction`: 是不是一个异步箭头函数
- `assertAsyncArrowFunctionFilled`: 是不是一个参数个数大于 `0` 的异步箭头函数
- `assertSyncArrowFunction`: 是不是一个同步箭头函数
- `assertSyncArrowFunctionFilled`: 是不是一个参数个数大于 `0` 的同步箭头函数


##### `function`

- `assertAsyncFunction`: 是不是一个异步函数
- `assertAsyncFunctionFilled`: 是不是一个参数个数大于 `0` 的异步函数
- `assertFunction`: 是不是一个函数 (包含同步函数、异步函数、`Generator` 函数 ...)
- `assertFunctionArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是函数
- `assertFunctionBound`: 是不是一个经过 `.bind()` 所绑定过的函数
- `assertFunctionFilled`: 是不是一个参数个数大于 `0` 的函数
- `assertNativeFunction`: 是不是一个 `JavaScript` 内置函数
- `assertSyncFunction`: 是不是一个同步函数
- `assertSyncFunctionFilled`: 是不是一个参数个数大于 `0` 的同步函数

#### `generator`

- `assertAsyncGenerator`: 是不是一个异步的 `Generator`
- `assertAsyncGeneratorFunction`: 是不是一个异步的 `Generator` 函数
- `assertGenerator`: 是不是一个 `Generator`
- `assertGeneratorFunction`: 是不是一个 `Generator` 函数
- `assertSyncGenerator`: 是不是一个同步的 `Generator`
- `assertSyncGeneratorFunction`: 是不是一个同步的 `Generator` 函数

#### `iterator`

- `assertAsyncIterable`: 是不是一个异步可迭代的对象
- `assertIterable`: 是不是一个同步或异步的可迭代的对象
- `assertIterator`: 是不是一个 `Iterator`
- `assertSyncIterable`: 是不是一个同步可迭代的对象

#### `nullable`

- `assertNull`: 是不是 `null`
- `assertNullArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是 `null`
- `assertNullOrUndefined`: 是不是 `undefined` 或者 `null`
- `assertNullOrUndefinedArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是 `null` 或 `undefined`
- `assertUndefined`: 是不是 `undefined`
- `assertUndefinedArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是 `undefined`

#### `number`

- `assertFinite`: 是不是一个不是 `Infinity`、`-Infinity` 或 `NaN` 的有限数
- `assertFloat`: 是不是一个浮点数，即不是整数的数
- `assertFloat16`: 是不是一个半精度浮点数，取值在 `-65504 - 65504` 之间的浮点数
- `assertFloat16SafeInt`: 是不是一个可以被半精度浮点数所能存储的整数，即 `2^11-1`，取值范围为 `-2047 - 2047`
- `assertFloat32`: 是不是一个单精度浮点数，取值在 `-3.4028234663852886e38 - 3.4028234663852886e38` 之间的浮点数
- `assertFloat32SafeInt`: 是不是一个可以被单精度浮点数所能存储的整数，即 `2^24-1`，取值范围为 `-16777215 - 16777215`
- `assertFloat64`: 是不是一个双精度浮点数，取值在 `-1.7976931348623157e308 - 1.7976931348623157e308` 之间的浮点数
- `assertFloat64SafeInt`: 是不是一个可以被双精度浮点数所能存储的整数，即 `2^53-1`，取值范围为 `-9007199254740991 - 9007199254740991`
- `assertInfinity`: 是不是一个无穷大的数
- `assertInfinityNegative`: 是不是一个 `-Infinity`，即负无穷大的数
- `assertInfinityPositive`: 是不是一个 `Infinity`，即正无穷大的数
- `assertInt`: 是不是一个整数
- `assertInt16`: 是不是一个 `int16`，取值范围为 `-2^15 - 2^15-1` 的整数，即 `-32768 - 32767`
- `assertInt32`: 是不是一个 `int32`，取值范围为 `-2^31 - 2^31-1` 的整数，即 `-2147483648 - 2147483647`
- `assertInt8`: 是不是一个 `int8`，取值范围为 `-2^7 - 2^7-1` 的整数，即 `-128 - 127`
- `assertIntEven`: 是不是一个偶数，即取模后等于 `0` 的整数
- `assertIntOdd`: 是不是一个奇数，即取模后等于 `1` 的整数
- `assertIntSafe`: 是不是一个安全的整数
- `assertNaN`: 是不是一个 `NaN`
- `assertNumber`: 是不是一个数字或被包装后的数字对象
- `assertNumberArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是数字或被包装后的数字对象
- `assertNumberFilled`: 是不是一个不是 `0`、`Infinity`、`-Infinity` 或 `NaN` 的数字
- `assertNumberNegative`: 是不是一个小于 `0` 且不是 `-Infinity` 或 `NaN` 的负数
- `assertNumberObject`: 是不是一个被包装后的数字对象，即 `new Number()` || `Object(0)`
- `assertNumberPositive`: 是不是一个大于 `0` 且不是 `Infinity` 或 `NaN` 的正数
- `assertNumberPrimitive`: 是不是一个基本的数字，即 `number` || `Number()`
- `assertNumberSafe`: 是不是一个可以安全计算的数字
- `assertNumberValid`: 是不是一个可以转换为有效的数字的值
- `assertPrimeNumber`: 是不是一个质数 (素数)
- `assertUFloat`: 是不是一个无符号浮点数，即大于 `0` 的浮点数
- `assertUint`: 是不是一个无符号整数，即大于或等于 `0` 的整数
- `assertUint16`: 是不是一个 `uint16`，取值范围为 `0 - 2^16-1` 的正整数，即 `0 - 65535`
- `assertUint32`: 是不是一个 `uint32`，取值范围为 `0 - 2^32-1` 的正整数，即 `0 - 4294967295`
- `assertUint8`: 是不是一个 `uint8`，取值范围为 `0 - 2^8-1` 的正整数，即 `0 - 255`
- `assertUintFilled`: 是不是一个大于 `0` 的无符号整数
- `assertUintSafe`: 是不是一个安全的无符号整数
- `assertUintSafeFilled`: 是不是一个大于 `0` 的安全的无符号整数
- `assertZero`: 是不是 `0`

#### `object`

- `assertObject`: 是不是一个 `[object Object]` 的对象
- `assertObjectArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是标记为 `[object Object]` 的对象
- `assertObjectFilled`: 是不是一个属性个数大于 `0` 的对象
- `assertPlainObject`: 是不是一个普通对象，即 `{}`，该对象的原型指向 `Object.prototype`
- `assertPlainObjectFilled`: 是不是一个属性个数大于 `0` 的普通对象，即 `{}`
- `assertPureObject`: 是不是一个纯对象，即通过 `Object.create(null)` 创建的对象，该对象的原型就是 `null`
- `assertTypeofObject`: 使用 `typeof` 判断是不是一个不是 `null` 的任意对象
- `assertTypeofObjectArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是对象 (通过 `typeof` 判断且不为 `null`)

#### `platform`

- `assertGlobalThis`: 当前的执行环境是不是包含 `globalThis`

##### `browser`

- `assertBrowser`: 当前的执行环境是不是浏览器
- `assertBrowserExtension`: 当前的执行环境是不是浏览器扩展

##### `command`

- `assertBun`: 当前的执行环境是不是 `Bun`
- `assertDeno`: 当前的执行环境是不是 `Deno`
- `assertJsDom`: 当前的执行环境是不是 `JsDom`
- `assertNodejs`: 当前的执行环境是不是 `Node.js`
- `assertNodejsProcess`: 是不是 `Node.js` 的 `process` 模块

##### `desktop`

- `assertElectron`: 当前的执行环境是不是 `Electron`
- `assertLinux`: 当前的执行环境是不是 `Linux`
- `assertMacOS`: 当前的执行环境是不是 `macOS`
- `assertWindows`: 当前的执行环境是不是 `Windows`

##### `mobile`

- `assertAndroid`: 当前的执行环境是不是 `Android`
- `assertIOS`: 当前的执行环境是不是 `iOS`
- `assertReactNative`: 当前的执行环境是不是 `React Native`

##### `webWorker`

- `assertDedicatedWorker`: 当前的执行环境是不是 `DedicatedWorker`
- `assertServiceWorker`: 当前的执行环境是不是 `ServiceWorker`
- `assertSharedWorker`: 当前的执行环境是不是 `SharedWorker`
- `assertWebWorker`: 当前的执行环境是不是 `Web Worker`

#### `primitive`

- `assertFalsy`: 是不是一个虚值 (强制转换为 `Boolean` 后为 `false` 的值)
- `assertFalsyArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是虚值 (强制转换为 `Boolean` 后为 `false` 的值)
- `assertPrimitive`: 是不是一个基本类型的值
- `assertTruthy`: 是不是一个真值 (强制转换为 `Boolean` 后为 `true` 的值)
- `assertTruthyArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是真值 (强制转换为 `Boolean` 后为 `true` 的值)

#### `promise`

- `assertPromise`: 是不是一个 `Promise`
- `assertPromiseLike`: 是不是一个有 `then` 方法的像 `Promise` 的对象或函数

#### `property`

- `assertLengthy`: 是不是一个具有 `length` 属性的类型，其 `length` 的值是一个大于或等于 `0` 的安全的无符号整数
- `assertLengthyFilled`: 是不是一个具有 `length` 属性的类型，其 `length` 的值是一个大于 `0` 的安全的无符号整数
- `assertOwnProperty`: 确定一个值上是否具有指定名称的私有属性
- `assertProperty`: 确定一个值上是否具有指定名称的属性，该属性可以是私有属性，也可以是原型上的属性
- `assertPropertyDescriptor`: 是不是一个属性描述器
- `assertPropertyKey`: 是不是一个可以作为属性的值
- `assertPrototype`: 是不是一个构造函数的原型对象
- `assertPrototypeOf`: 判断一个对象是否存在于另一个对象的原型链中
- `assertSizey`: 是不是一个具有 `size` 属性的类型，其 `size` 的值是一个大于或等于 `0` 的安全的无符号整数
- `assertSizeyFilled`: 是不是一个具有 `size` 属性的类型，其 `size` 的值是一个大于 `0` 的安全的无符号整数

#### `regexp`

- `assertRegExp`: 是不是一个正则表达式

#### `stream`

- `assertDuplex`: 是不是一个双工流
- `assertReadable`: 是不是一个可读流
- `assertStream`: 是不是一个流
- `assertTransform`: 是不是一个转换流
- `assertWritable`: 是不是一个可写流

#### `string`

- `assertChar`: 是不是单个字符
- `assertString`: 是不是一个字符串或被包装后的字符串对象
- `assertStringArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是字符串或被包装后的字符串对象
- `assertStringFilled`: 是不是一个长度大于 `0` 的字符串
- `assertStringObject`: 是不是一个被包装后的字符串对象，即 `new String()`
- `assertStringPrimitive`: 是不是一个基本的字符串，即 `string`
- `assertStringTrim`: 是不是一个经过 `trim` 后长度大于指定长度的字符串

#### `symbol`

- `assertSymbol`: 是不是一个 `symbol` 或被包装后的 `Symbol` 对象
- `assertSymbolArray`: 是不是一个长度大于 `0` 的数组，且每一项的值都是 `symbol` 或被包装后的 `Symbol` 对象
- `assertSymbolObject`: 是不是一个被包装后的 `Symbol` 对象，即 `Object(Symbol())`
- `assertSymbolPrimitive`: 是不是一个基本的 `symbol` || `Symbol()`

#### `timeout`

- `assertTimeoutMs`: 是不是一个超时时间毫秒数

#### `type`

- `assertTagEqual`: 判断原型上的类型标记是否等于某个值
- `assertTypeofEqual`: 判断一个值的类型是否与指定的类型字符串相等

#### `url`

- `assertURL`: 是不是一个 `URL` 对象
- `assertURLSearchParams`: 是不是一个 `URLSearchParams`
- `assertURLString`: 是不是一个可以转换为 `URL` 对象的的字符串

#### `variable`

- `assertVarName`: 是不是可以把值当做 `JavaScript` 的变量名
