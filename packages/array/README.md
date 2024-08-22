# `@curong/array`

`@curong/array` 包含以下的方法:

- `flat`: 展平一个多维数组
- `fromArrayLike`: 将一个类数组转换为数组
- `isUnique`: 判断数组中的所有元素是否都是唯一的
- `maxLengthIndex`: 获取字符串数组中最大长度的项的索引位置
- `maxRecursionDepth`: 计算数组的最大递归深度 (即数组中包含数组)
- `minLengthIndex`: 获取字符串数组中最小长度的项的索引位置
- `random`: 从数组中随机挑选一个元素
- `shuffle`: 将一个数组随机打乱
- `splitChunk`: 将一个数组按照指定的大小拆分成多个数组
- `uniqueFromPrimitive`: 对相同类型的基本类型的值或包含相同类型基本类型值的数组去重
- `toArray`: 将给定的值转换为数组

## `dimension`

- `dimensionLevel`: 判断一个数组的维度
- `isMultiDimensional`: 是不是一个多维数组 (至少是二维)

## `sort`

- `sortByEng`: 按照单词的所有字母全量排序
- `sortByEngInitials`: 根据英文首字母排序
- `sortToIndexes`: 以行的长度进行排列，并以升序的排列方式返回索引数组
- `sortWords`: 给单词数组排序，中文按照音序排序，英文按照整个单词全量排序
