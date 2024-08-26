// https://github.com/philipstanislaus/performant-array-to-tree

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
     * 以父 ID 为键，值为 `true` 的对象，这些父 ID 应被视为树的顶层或根元素。
     *
     * 当你的树是完整树的子集时，这个选项非常有用，也就是说，没有项的父 `id` 是 `undefined`、`null` 或 ''。你传入的数组将替代默认值。
     * `undefined` 和 `null` 总是被认为是 `rootParentIds`。
     *
     * 默认值为 `{'': true}`
     */
    rootParentIds: { [rootParentId: string]: true };

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

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * 递归返回树中的节点数量
 *
 * @param tree 树节点数组，每个节点都有一个字段`childrenField`，包含节点数组
 * @param childrenField 包含子节点数组的属性名称
 * @returns 树中的节点数量
 */
export const countNodes = (tree: TreeItem[], childrenField: string): number => {
    let count = 0;

    for (let i = 0; i < tree.length; i++) {
        count += 1; // 当前节点
        count += countNodes(tree[i][childrenField] ?? [], childrenField); // 递归子节点
    }

    return count;
};

/**
 * 返回项中嵌套属性的值
 *
 * 例如：用户可以访问 `item = {nestedObject: {id: 'myId', parentId: 'myParentId'}}` 中的 `id` 或 `parentId`
 * 使用` getNestedItemProperty(item, 'nestedObject.id')` 或 `getNestedItemProperty(item, 'nestedObject.parentId')`
 *
 * @param item 要访问的项
 * @param nestedProperty 链式属性以访问嵌套属性。例如：`your.nested.property`
 */
const getNestedProperty = (item: Item, nestedProperty: string) => {
    if (nestedProperty.indexOf('.') < 0) {
        return item[nestedProperty];
    }

    const keys = nestedProperty.split('.');
    let current = item;

    for (let i = 0; i < keys.length; i++) {
        // 如果某个键值不存在，则返回 `undefined`
        if (current == null) {
            return undefined;
        }

        current = current[keys[i]];
    }

    return current;
};

/**
 * 将数组展开为树结构，时间复杂度为 `O(n)`
 */
export default function toTree(
    items: Item[],
    options: Partial<ToTreeOptions> = {}
): TreeItem[] {
    const {
        id: cid = 'id',
        parentId: pid = 'parentId',
        dataField = 'data',
        childrenField = 'children',
        throwIfOrphans = false,
        rootParentIds = { '': true },
        nestedIds = true,
        assign = false
    } = options;

    // 结果中的树结构
    const rootItems: TreeItem[] = [];

    // 存储所有已处理的项，使用它们的 `id` 作为键，以便于查找
    const lookup: { [id: string]: TreeItem } = {};

    // 存储所有尚未添加到结果树中的项的 `id`
    // 这是一个可选属性，因为它有轻微的运行时开销
    const orphanIds: null | Set<string | number> = throwIfOrphans
        ? new Set()
        : null;

    // 这个循环的想法：
    // 每当一个项有父项，但父项尚未在查找对象中时，我们在查找对象中存储一个初步的父项
    // 稍后用父项的数据填充它
    // 如果一个项没有 `parentId`，则将其作为根元素添加到 `rootItems` 中
    for (const item of items) {
        let itemId;
        let parentId;

        if (nestedIds) {
            itemId = getNestedProperty(item, cid);
            parentId = getNestedProperty(item, pid);
        } else {
            itemId = item[cid];
            parentId = item[pid];
        }

        if (rootParentIds[itemId]) {
            throw new Error(
                `items 数组中包含一个节点，它的 parentId 既存在于另一个节点中又在 rootParentIds 中。` +
                    `{itemId: "${itemId}", rootParentIds: ${JSON.stringify(Object.keys(rootParentIds))}}`
            );
        }

        // 检查项是否已存在于查找表中
        if (!hasOwnProperty.call(lookup, itemId)) {
            // 项尚不存在，因此添加一个初步的项（稍后会添加它的数据）
            lookup[itemId] = { [childrenField]: [] };
        }

        // 如果我们跟踪孤立节点，如果此项在孤立节点集中，则将其删除
        if (orphanIds) {
            orphanIds.delete(itemId);
        }

        // 将当前项的数据添加到查找表中的项中
        if (dataField) {
            lookup[itemId][dataField] = item;
        } else if (assign) {
            lookup[itemId] = Object.assign(item, {
                [childrenField]: lookup[itemId][childrenField]
            });
        } else {
            lookup[itemId] = {
                ...item,
                [childrenField]: lookup[itemId][childrenField]
            };
        }

        const treeItem = lookup[itemId];

        if (parentId == null || rootParentIds[parentId]) {
            // 是一个根项
            rootItems.push(treeItem);
        } else {
            // 有父项

            // 检查父项是否已存在于查找表中
            if (!hasOwnProperty.call(lookup, parentId)) {
                // 父项尚不存在，因此添加一个初步的父项 (稍后会添加它的数据)
                lookup[parentId] = { [childrenField]: [] };

                // 如果我们跟踪孤立节点，将生成的父项添加到孤立节点列表中
                if (orphanIds) {
                    orphanIds.add(parentId);
                }
            }

            // 将当前项添加到父项中
            lookup[parentId][childrenField].push(treeItem);
        }
    }

    if (orphanIds?.size) {
        throw new Error(
            `items 数组包含指向以下 parentIds 的孤立项: [${Array.from(orphanIds)}]\n` +
                '这些 parentIds 在 items 数组中不存在。提示：通过传递以下选项来防止孤儿节点导致的错误: {throwIfOrphans: false}'
        );
    }

    if (
        throwIfOrphans &&
        countNodes(rootItems, childrenField) < Object.keys(lookup).length
    ) {
        throw new Error(`items 数组包含具有循环父子关系的节点`);
    }

    return rootItems;
}
