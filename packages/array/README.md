# `@curong/array`

`@curong/array` 包含以下的方法:

- `flat`: 展平一个多维数组
- `fromArrayLike`: 将一个类数组转换为数组
- `maxLengthIndex`: 获取字符串数组中最大长度的项的索引位置
- `maxRecursionDepth`: 计算数组的最大递归深度 (即数组中包含数组)
- `minLengthIndex`: 获取字符串数组中最小长度的项的索引位置
- `move`: 将数组中的指定元素从 `from` 移动到 `to`
- `random`: 从数组中随机挑选一个元素
- `range`: 生成一个指定范围的数字数组
- `shuffle`: 将一个数组随机打乱

## `convert`

- `toArray`: 将给定的值转换为数组
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

## `map`

- `mapAsync`: 异步串行遍历数组并对每个元素依次执行回调函数
- `mapParallel`: 异步并行遍历数组并对每个元素执行回调函数
- `mapRight`: 从右到左遍历数组并对每个元素依次执行回调函数
- `mapRightAsync`: 从右到左异步串行遍历数组并对每个元素依次执行异步回调函数
- `mapRightParallel`: 从右到左异步并行遍历数组并对每个元素执行异步回调函数

## `sort`

- `sortByEng`: 按照单词的所有字母全量排序
- `sortByEngInitials`: 根据英文首字母排序
- `sortToIndexes`: 以行的长度进行排列，并以升序的排列方式返回索引数组
- `sortWords`: 给单词数组排序，中文按照音序排序，英文按照整个单词全量排序

## `split`

- `splitByStep`: 将一个数组按照指定的步长拆分为二维数组
- `splitChunk`: 将一个数组按照指定的长度拆分为二维数组
