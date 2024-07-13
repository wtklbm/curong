# `@curong/function`

`@curong/function` 主要包含以下的方法:

- `before`: 在执行某一个函数之前，先执行一个其他函数
- `cancelExec`: 随时取消对 `Promise`、同步函数或异步函数的执行
- `collectItems`: 收集 `Promise`，返回收集的 `Promise` 数组的结果
- `curring`: 把接受多个参数的函数变成接受任意多个参数的函数，并且返回接受余下的参数的新函数
- `padding`: 执行任务并等待结果的返回
- `parallel`: 一个异步并发器，用于控制并发执行任务，支持失败重试和进度回调
- `reach`: 当函数执行到达指定次数后执行回调函数
- `select`: 根据条件来返回相应的结果

### `catch`

- `catchOr`: 执行一个任务，并在任务失败时执行后备任务或返回后备值
- `noCatch`: 获取函数返回的值，并忽略抛出的错误
- `tryCatch`: `try...catch...` 语法的 `Promise` 包装

### `delay`

- `delay`: 异步阻塞一段时间
- `delayRun`: 等待一段时间后执行一个同步或异步的函数
- `delaySync`: 同步阻塞一段时间

### `timeout`

- `clearTimeoutAll`: 清除所有已分配的 `setTimeout` 定时器
- `setTimeout`: 设置一个定时器，一旦定时器到期，就会执行回调
- `timeoutLog`: 将超时时间打印为一个可读的字符串格式。包含天、小时、分钟和秒
- `timeoutMsResolve`: 计算传递的值，并得到一个以毫秒为单位的超时时间
- `timeoutOr`: 执行一个函数，并获取函数的返回值，如果函数的执行时间超过 `duration` 时，就执行回调函数

包括以下类型：

- `ClassInstanceKeys`: 类的实例方法名的类型数组
