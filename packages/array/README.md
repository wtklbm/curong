# `@curong/array`

`@curong/array` 包含以下的方法:

## `convert`

- `ensureArray`: 将给定的值转换为数组
- `flat`: 展平一个多维数组
- `shuffle`: 将一个数组随机打乱
- `swap`: 交换数组中两个指定索引的元素
- `toArray`: 将一个类数组转换为数组
- `toObject`: 将给定的数组转换为一个普通对象
- `toTree`: 将给定的数组转换为一个树型对象

## `dimension`

- `dimensionLevel`: 判断一个数组的维度
- `isMultiDimensional`: 是不是一个多维数组 (至少是二维)

## `each`

- `each`: 遍历数组并对每个元素依次执行回调函数
- `eachAsync`: 异步串行遍历数组并对每个元素依次执行回调函数
- `eachParallel`: 异步并行遍历数组并对每个元素执行回调函数
- `eachRight`: 从右到左遍历数组并对每个元素依次执行回调函数
- `eachRightAsync`: 从右到左异步串行遍历数组并对每个元素依次执行异步回调函数
- `eachRightParallel`: 从右到左异步并行遍历数组并对每个元素执行异步回调函数

## `generate`

- `random`: 从数组中随机挑选一个元素
- `range`: 生成一个指定范围的数字数组

## `helper`

- `maxLengthIndex`: 获取字符串数组中最大长度的项的索引位置
- `maxRecursionDepth`: 计算数组的最大递归深度 (即数组中包含数组)
- `minLengthIndex`: 获取字符串数组中最小长度的项的索引位置

## `map`

- `mapAsync`: 异步串行遍历数组并对每个元素依次执行回调函数
- `mapParallel`: 异步并行遍历数组并对每个元素执行回调函数
- `mapRight`: 从右到左遍历数组并对每个元素依次执行回调函数
- `mapRightAsync`: 从右到左异步串行遍历数组并对每个元素依次执行异步回调函数
- `mapRightParallel`: 从右到左异步并行遍历数组并对每个元素执行异步回调函数

## `move`

- `move`: 将数组中的元素从一个位置移动到另一个位置
- `moveDown`: 将数组中的元素向下移动指定的步数
- `moveToBottom`: 将数组中的元素移动到数组的结尾
- `moveToTop`: 将数组中的元素移动到数组的开头
- `moveUp`: 将数组中的元素向上移动指定的步数

## `remove`

- `clearArray`: 清空数组并返回清空后的数组

## `set`

- `complement`: 获取两个数组的补集，即在 `b` 中存在但在 `a` 中不存在的元素
- `difference`: 获取两个数组的差集，即在 `a` 中存在但在 `b` 中不存在的元素
- `intersection`: 获取两个数组的交集，即在 `a` 和 `b` 中都存在的元素
- `symmetricDifference`: 获取两个数组的对称差集，即在 `a` 或 `b` 中存在，但不在两者都有的元素
- `union`: 获取两个数组的并集，即合并两个数组并去除重复元素

## `sort`

- `sortByEng`: 按照单词的所有字母全量排序
- `sortByEngInitials`: 根据英文首字母排序
- `sortToIndexes`: 以行的长度进行排列，并以升序的排列方式返回索引数组
- `sortWords`: 给单词数组排序，中文按照音序排序，英文按照整个单词全量排序

## `split`

- `splitByStep`: 将一个数组按照指定的步长拆分为二维数组
- `splitChunk`: 将一个数组按照指定的长度拆分为二维数组

## `unique`

- `isUnique`: 判断数组中的所有元素是否都是唯一的
- `uniqueFromPrimitive`: 对相同类型的基本类型的值或包含相同类型基本类型值的数组去重
