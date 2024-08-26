import type { Item, ToTreeOptions, TreeItem } from './types';

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
 * 将给定的数组转换为一个树型对象
 *
 * 该方法改编自 [performant-array-to-tree](https://github.com/philipstanislaus/performant-array-to-tree) (已弃用)，其时间复杂度为 `O(n)`。
 *
 * @param items 需要转换的数组
 * @param options 配置选项
 * @returns 返回转换好的树型对象
 * @throws
 *  - 如果 `items` 数组中包含一个节点，它的 parentId 既存在于另一个节点中又在 rootParentIds 中
 *  - `items` 数组包含指向以下 `parentIds` 的孤立项，这些 `parentIds` 在 `items` 数组中不存在
 *  - 如果 `throwIfOrphans` 为 `true`，且 `items` 数组包含具有循环父子关系的节点
 * @example
 *
 * ```typescript
 * const arr = [
 *   { id: 1, parentId: null },
 *   { id: 2, parentId: 1 },
 *   { id: 3, parentId: 2 },
 *   { id: 4, parentId: 3 }
 * ]
 *
 * const tree = toTree(arr)[0];
 *
 * console.log(tree);
 * // {
 * //     data: { id: 1, parentId: null },
 * //     children: [
 * //         {
 * //             data: { id: 2, parentId: 1 },
 * //             children: [
 * //                 {
 * //                     data: { id: 3, parentId: 2 },
 * //                     children: [{ data: { id: 4, parentId: 3 }, children: [] }]
 * //                 }
 * //             ]
 * //         }
 * //     ]
 * // };
 * ```
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
        rootParentIds = { '': true, 0: true },
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
