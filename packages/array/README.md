[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

[npm-version-src]: https://img.shields.io/npm/v/@curong/array?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@curong/array
[npm-downloads-src]: https://img.shields.io/npm/dm/@curong/array?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/@curong/array
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@curong/array?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=@curong/array
[license-src]: https://img.shields.io/github/license/wtklbm/curong.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/wtklbm/curong/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/@curong/array

# `@curong/array`

`@curong/array` 包含以下的方法:

## `collection`

- `complement`: 获取两个数组的补集，即在 `b` 中存在但在 `a` 中不存在的元素
- `difference`: 获取两个数组的差集，即在 `a` 中存在但在 `b` 中不存在的元素
- `intersection`: 获取两个数组的交集，即在 `a` 和 `b` 中都存在的元素
- `symmetricDifference`: 获取两个数组的对称差集，即在 `a` 或 `b` 中存在，但不在两者都有的元素
- `union`: 获取多个数组的并集，即合并多个数组并去除重复元素

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

## `find`

- `includesEvery`: 判断一个数组是否包含另一个数组的所有元素
- `indexOfAll`: 查找数组中所有匹配元素的索引

## `generate`

- `createArray`: 生成一个指定长度的数组，并根据索引调用映射函数填充数组元素
- `random`: 从数组中随机挑选一个元素或多个元素
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
- `removeAll`: 从数组中移除所有匹配的元素

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
- `uniq`: 数组去重，返回由唯一元素组成的新数组
- `uniqueBy`: 根据自定义比较函数移除数组中的重复元素
- `uniqueByKey`: 根据对象属性键或自定义键函数去除数组中的重复项
