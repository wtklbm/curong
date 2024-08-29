# `@curong/function`

`@curong/function` 主要包含以下的方法:

- `bind`: 将函数绑定到指定的上下文对象上
- `curring`: 把接受多个参数的函数变成接受任意多个参数的函数，并且返回接受余下的参数的新函数

### `cache`

- `memoizeWith`: 返回一个新函数，并缓存函数的计算结果

### `catch`

- `ifThrow`: 执行一个任务，并在任务失败时执行后备任务或返回后备值
- `noCatch`: 获取函数返回的值，并忽略抛出的错误
- `tryCatch`: `try...catch...` 语法的 `Promise` 包装

### `chain`

- `after`: 创建一个新的函数，该函数在调用目标函数后，会在执行一个后置函数，并返回目标函数的结果
- `applyAfter`: 创建一个新的函数，该函数在调用目标函数后，会将目标函数的返回值作为第一个参数传递给后置函数，并返回后置函数的结果
- `applyBefore`: 创建一个新的函数，该函数在调用目标函数前，会先调用指定的前置函数，并将前置函数的返回值作为第一个参数传递给目标函数，并返回目标函数的结果
- `before`: 创建一个新的函数，该函数在调用目标函数前，会先执行一个前置函数，并返回目标函数的结果
- `compose`: 按顺序组合多个函数，使其从左到右依次执行
- `withAfter`: 创建一个新的函数，该函数在调用目标函数后，会将目标函数的返回值作为第一个参数传递给后置函数，并返回目标函数的结果
- `withBefore`: 创建一个新的函数，该函数在调用目标函数前，会先调用指定的前置函数，并将前置函数的返回值作为第一个参数传递给目标函数，并返回前置函数的结果

## `class`

- `singletonClass`: 创建一个类的单例模式代理，确保该类在应用中只能被实例化一次

## `control`

- `cancelExec`: 随时取消对 `Promise`、同步函数或异步函数的执行
- `collectItems`: 收集 `Promise`，返回收集的 `Promise` 数组的结果
- `deferred`: 创建一个可以受外部控制的 `Promise`
- `padding`: 执行任务并等待结果的返回
- `parallel`: 一个异步并发器，用于控制并发执行任务，支持失败重试和进度回调

### `delay`

- `delay`: 异步阻塞一段时间
- `delayReturn`: 执行一个函数，并等待一段时间后再返回
- `delayRun`: 等待一段时间后执行一个同步或异步的函数
- `delaySync`: 同步阻塞一段时间

### `limit`

- `once`: 返回一个函数，确保 `fn` 只能被执行一次，之后的调用将返回第一次执行的结果，而不会重新执行 `fn`
- `runAfterTimes`: 返回一个函数，当函数执行到达指定次数后执行回调函数
- `runOnlyNTimes`: 返回一个函数，当函数执行到达指定次数后就不再执行回调函数

### `promise`

- `executeToPromise`: 如果传递的是一个函数，就将函数执行，否则返回该值
- `toPromise`: 判断一个值的类型，如果是 `Promise` 就直接返回，如果是函数，就将函数执行，如果是值就直接返回该值

### `select`

- `select`: 根据条件来返回相应的结果
- `toggle`: 创建一个用于在两个值之间切换的工具

### `timeout`

- `clearTimeoutAll`: 清除所有已分配的 `setTimeout` 定时器
- `nextTick`: `process.nextTick` 的 `polyfill`，用于将 `callback` 添加到 "下一个滴答队列"
- `setTimeout`: 设置一个定时器，一旦定时器到期，就会执行回调
- `timeoutLog`: 将超时时间打印为一个可读的字符串格式。包含天、小时、分钟和秒
- `timeoutMsResolve`: 计算传递的值，并得到一个以毫秒为单位的超时时间
- `timeoutOr`: 执行一个函数，并获取函数的返回值，如果函数的执行时间超过 `duration` 时，就执行回调函数

包括以下类型：

- `ClassInstanceKeys`: 类的实例方法名的类型数组
