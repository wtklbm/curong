# `@curong/object`


`@curong/object` 主要包含以下的方法:

- `constructor`: 获取一个值的构造函数
- `constructorName`: 获取一个值的构造函数的名称
- `createWithNull`: 创建一个纯对象，该对象的原型是 `null`
- `deleteAttrs`: 从一个对象中删除一些属性
- `derive`: 基于一个对象派生出和它长得一模一样的对象。在派生出的对象中，它的属性和 `obj` 是完全一样的
- `isInstanceOf`: 判断给定的值是否是指定类的实例
- `shallowEqual`: 通过浅比较的方式比较两个对象中的属性。(仅比较对象中的一层属性)
- `toArray`: 将一个普通对象的键值对转换为数组

##  `cascade`

- `cascade`: 根据级联属性字符串获取源对象中的内容
- `fromCascadeKeys`: 将级联属性数组转换为一个属性字符串
- `toCascadeKeys`: 将级联属性字符串转换为一个级联属性数组

##  `keys`

- `isKeysIncludes`: 检查指定的键是否存在于给定的对象或类数组对象中
- `keys`: 从给定的对象或类数组对象中获取所有的键
- `sortKeys`: 对象或数组的键进行排序
- `toLowerCaseKey`: 将一个对象中的键全部转换为小写，并返回一个新的对象

##  `property`

- `getProperty`: 获取属性的值
- `getPropertyGetter`: 传递一个属性名，并返回一个新的函数，该函数可用于从对象中提取该属性的值
- `isPrototypeProperty`: 是不是当前对象的原型上的属性

## `remove`

- `clearObject`: 清空对象的所有属性并返回操作结果

##  `values`

- `isValuesIncludes`: 检查指定的值是否存在于给定的对象或类数组对象中
- `values`: 从给定的对象或类数组对象中获取所有的值
- `getFromPaths`: 从给定的对象或类数组对象中获取所有的值
