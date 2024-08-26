export interface Item<T = any> {
    [key: string]: T;
}

export interface TreeItem<T = any> {
    [key: string]: Item | TreeItem[] | T;
}

export interface ToTreeOptions {
    /** `id` 字段的键，也适用于嵌套属性 (例如 `nested.parentId`)。默认值为 `id` */
    id: string;

    /** 父 `id` 字段的键，也适用于嵌套属性 (例如 `nested.parentId`)。默认值为 `parentId` */
    parentId: string;

    /** 包含所有子节点的父节点的键。默认值为 `children` */
    childrenField: string;

    /** 包含原始项的所有属性或数据的键。如果你不需要容器，可以设置为 `null`。默认值为 `data` */
    dataField: string | null;

    /** 如果 `id` 和 `parentId` 中包含 `.`，则是否递归获取级联属性，拿到最终的 `id` 和 `parentId`。默认值为 `true` */
    nestedIds: boolean;

    /**
     * 当项数组包含一个或多个没有父项的项，或者数组包含具有循环父子关系的项时，是否抛出错误。
     *
     * 启用时，函数将抛出包含在项数组中未找到的 `parentIds` 的错误，或者在仅循环引用的情况下抛出错误。
     * 如果树中的节点数量少于原始数组中的节点数量，函数将抛出错误。
     * 禁用时，函数将忽略孤儿和循环关系，并且不将它们添加到树中。
     *
     * 默认值为 `false`。此选项有较小的运行时开销，因此默认情况下禁用。
     */
    throwIfOrphans: boolean;

    /**
     * 将 `parentId` 的值作为键，将布尔值作为值的对象，具有这些 `parentId` 的值的元素将会被视为树的根元素。
     *
     * `undefined` 和 `null` 总是被认为是树的根元素。我们还可以将 `parentId` 的值为空字符串或 `0` 的元素视为树的根元素。
     *
     * 如果布尔值为 `true`，则将该值作为树的根元素。将值设置为 `false` 则正好相反，将不会被视为树的根元素。
     *
     * 默认值为 `{'': true, 0: true}`
     */
    rootParentIds: { [rootParentId: PropertyKey]: boolean };

    /**
     * 启用 `Object.assign` 而不是扩展运算符来创建树中的项 (当 `dataField` 为 `null` 时) 的选项。
     * 如果你的项具有应该保持的原型，这很有用。
     *
     * 如果启用且 `dataField` 为 `null`，将使用原始节点项，并将 `children` 属性赋值，调用该字段上的任何 `setter`。
     * 如果 `dataField` 不为 `null`，则此选项没有效果，因为原始节点将被用于新对象的 `dataField`。
     * 如果你不确定是否需要启用此选项，通常可以保持禁用状态。默认值为 `false`。
     */
    assign: boolean;
}
