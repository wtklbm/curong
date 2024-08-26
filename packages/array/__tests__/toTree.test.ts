import { toTree } from '../src';
import { countNodes } from '../src/toTree';

describe('toTree', () => {
    test('should work with nested objects', () => {
        expect(
            toTree([
                { id: '4', parentId: null, custom: 'abc' },
                { id: '31', parentId: '4', custom: '12' },
                { id: '1941', parentId: '418', custom: 'de' },
                { id: '1', parentId: '418', custom: 'ZZZz' },
                { id: '418', parentId: null, custom: 'ü' }
            ])
        ).toStrictEqual([
            {
                data: { id: '4', parentId: null, custom: 'abc' },
                children: [
                    {
                        data: { id: '31', parentId: '4', custom: '12' },
                        children: []
                    }
                ]
            },
            {
                data: { id: '418', parentId: null, custom: 'ü' },
                children: [
                    {
                        data: { id: '1941', parentId: '418', custom: 'de' },
                        children: []
                    },
                    {
                        data: { id: '1', parentId: '418', custom: 'ZZZz' },
                        children: []
                    }
                ]
            }
        ]);
    });

    test('should work with nested objects if throwIfOrphans is set to true', () => {
        expect(
            toTree(
                [
                    { id: '4', parentId: null, custom: 'abc' },
                    { id: '31', parentId: '4', custom: '12' },
                    { id: '1941', parentId: '418', custom: 'de' },
                    { id: '1', parentId: '418', custom: 'ZZZz' },
                    { id: '418', parentId: null, custom: 'ü' }
                ],
                { throwIfOrphans: true }
            )
        ).toStrictEqual([
            {
                data: { id: '4', parentId: null, custom: 'abc' },
                children: [
                    {
                        data: { id: '31', parentId: '4', custom: '12' },
                        children: []
                    }
                ]
            },
            {
                data: { id: '418', parentId: null, custom: 'ü' },
                children: [
                    {
                        data: { id: '1941', parentId: '418', custom: 'de' },
                        children: []
                    },
                    {
                        data: { id: '1', parentId: '418', custom: 'ZZZz' },
                        children: []
                    }
                ]
            }
        ]);
    });

    test('should ignore circular parent child relations', () => {
        expect(
            toTree([
                { id: '4', parentId: '31', custom: 'abc' },
                { id: '31', parentId: '4', custom: '12' }
            ])
        ).toStrictEqual([]);

        expect(
            toTree([
                { id: '4', parentId: '31', custom: 'abc' },
                { id: '31', parentId: '5', custom: '12' },
                { id: '5', parentId: '4', custom: '12' }
            ])
        ).toStrictEqual([]);
    });

    test('should throw if throwIfOrphans is enabled and circular parent child relations are encountered, see #37', () => {
        expect(() =>
            toTree(
                [
                    { id: '4', parentId: '31', custom: 'abc' },
                    { id: '31', parentId: '4', custom: '12' }
                ],
                { throwIfOrphans: true }
            )
        ).toThrow('items 数组包含具有循环父子关系的节点');

        expect(() =>
            toTree(
                [
                    { id: '4', parentId: '31', custom: 'abc' },
                    { id: '31', parentId: '5', custom: '12' },
                    { id: '5', parentId: '4', custom: '12' }
                ],
                { throwIfOrphans: true }
            )
        ).toThrow('items 数组包含具有循环父子关系的节点');
    });

    test('should work with integer keys', () => {
        expect(
            toTree([
                { id: 4, parentId: null, custom: 'abc' },
                { id: 31, parentId: 4, custom: '12' },
                { id: 1941, parentId: 418, custom: 'de' },
                { id: 1, parentId: 418, custom: 'ZZZz' },
                { id: 418, parentId: null, custom: 'ü' }
            ])
        ).toStrictEqual([
            {
                data: { id: 4, parentId: null, custom: 'abc' },
                children: [
                    {
                        data: { id: 31, parentId: 4, custom: '12' },
                        children: []
                    }
                ]
            },
            {
                data: { id: 418, parentId: null, custom: 'ü' },
                children: [
                    {
                        data: { id: 1941, parentId: 418, custom: 'de' },
                        children: []
                    },
                    {
                        data: { id: 1, parentId: 418, custom: 'ZZZz' },
                        children: []
                    }
                ]
            }
        ]);
    });

    test('should work with integer parentId 0', () => {
        expect(
            toTree([
                { id: 0, parentId: null, custom: 'abc' },
                { id: 31, parentId: 0, custom: '12' }
            ])
        ).toStrictEqual([
            {
                data: { id: 0, parentId: null, custom: 'abc' },
                children: [
                    {
                        data: { id: 31, parentId: 0, custom: '12' },
                        children: []
                    }
                ]
            }
        ]);
    });

    test('should work with nested objects and custom keys', () => {
        expect(
            toTree(
                [
                    { num: '4', ref: null, custom: 'abc' },
                    { num: '31', ref: '4', custom: '12' },
                    { num: '1941', ref: '418', custom: 'de' },
                    { num: '1', ref: '418', custom: 'ZZZz' },
                    { num: '418', ref: null, custom: 'ü' }
                ],
                { id: 'num', parentId: 'ref', childrenField: 'nodes' }
            )
        ).toStrictEqual([
            {
                data: { num: '4', ref: null, custom: 'abc' },
                nodes: [
                    { data: { num: '31', ref: '4', custom: '12' }, nodes: [] }
                ]
            },
            {
                data: { num: '418', ref: null, custom: 'ü' },
                nodes: [
                    {
                        data: { num: '1941', ref: '418', custom: 'de' },
                        nodes: []
                    },
                    {
                        data: { num: '1', ref: '418', custom: 'ZZZz' },
                        nodes: []
                    }
                ]
            }
        ]);
    });

    test('should work with nested objects and a custom key with dots if nested properties are disabled', () => {
        expect(
            toTree(
                [
                    { '.key': '4', 'my.parent': null, custom: 'abc' },
                    { '.key': '31', 'my.parent': '4', custom: '12' },
                    { '.key': '1941', 'my.parent': '418', custom: 'de' },
                    { '.key': '1', 'my.parent': '418', custom: 'ZZZz' },
                    { '.key': '418', 'my.parent': null, custom: 'ü' }
                ],
                {
                    id: '.key',
                    parentId: 'my.parent',
                    childrenField: 'nodes',
                    nestedIds: false
                }
            )
        ).toStrictEqual([
            {
                data: { '.key': '4', 'my.parent': null, custom: 'abc' },
                nodes: [
                    {
                        data: { '.key': '31', 'my.parent': '4', custom: '12' },
                        nodes: []
                    }
                ]
            },
            {
                data: { '.key': '418', 'my.parent': null, custom: 'ü' },
                nodes: [
                    {
                        data: {
                            '.key': '1941',
                            'my.parent': '418',
                            custom: 'de'
                        },
                        nodes: []
                    },
                    {
                        data: {
                            '.key': '1',
                            'my.parent': '418',
                            custom: 'ZZZz'
                        },
                        nodes: []
                    }
                ]
            }
        ]);
    });

    test('should ignore objects if parentId does not exist', () => {
        expect(
            toTree([
                { id: '4', parentId: null, custom: 'abc' },
                { id: '31', parentId: '4', custom: '12' },
                { id: '1941', parentId: '418', custom: 'de' },
                { id: '1', parentId: '418', custom: 'ZZZz' },
                { id: '418', parentId: null, custom: 'ü' },
                { id: '1313', parentId: '13', custom: 'Not existing' }
            ])
        ).toStrictEqual([
            {
                data: { id: '4', parentId: null, custom: 'abc' },
                children: [
                    {
                        data: { id: '31', parentId: '4', custom: '12' },
                        children: []
                    }
                ]
            },
            {
                data: { id: '418', parentId: null, custom: 'ü' },
                children: [
                    {
                        data: { id: '1941', parentId: '418', custom: 'de' },
                        children: []
                    },
                    {
                        data: { id: '1', parentId: '418', custom: 'ZZZz' },
                        children: []
                    }
                ]
            }
        ]);
    });

    test('should work with nested objects with dataField set to null', () => {
        expect(
            toTree(
                [
                    { id: '4', parentId: null, custom: 'abc' },
                    { id: '31', parentId: '4', custom: '12' },
                    { id: '1941', parentId: '418', custom: 'de' },
                    { id: '1', parentId: '418', custom: 'ZZZz' },
                    { id: '418', parentId: null, custom: 'ü' }
                ],
                { dataField: null }
            )
        ).toStrictEqual([
            {
                id: '4',
                parentId: null,
                custom: 'abc',
                children: [
                    { id: '31', parentId: '4', custom: '12', children: [] }
                ]
            },
            {
                id: '418',
                parentId: null,
                custom: 'ü',
                children: [
                    { id: '1941', parentId: '418', custom: 'de', children: [] },
                    { id: '1', parentId: '418', custom: 'ZZZz', children: [] }
                ]
            }
        ]);
    });

    test('should work with nested objects and custom keys with dataField set to null', () => {
        expect(
            toTree(
                [
                    { num: '4', ref: null, custom: 'abc' },
                    { num: '31', ref: '4', custom: '12' },
                    { num: '1941', ref: '418', custom: 'de' },
                    { num: '1', ref: '418', custom: 'ZZZz' },
                    { num: '418', ref: null, custom: 'ü' }
                ],
                { id: 'num', parentId: 'ref', dataField: null }
            )
        ).toStrictEqual([
            {
                num: '4',
                ref: null,
                custom: 'abc',
                children: [{ num: '31', ref: '4', custom: '12', children: [] }]
            },
            {
                num: '418',
                ref: null,
                custom: 'ü',
                children: [
                    { num: '1941', ref: '418', custom: 'de', children: [] },
                    { num: '1', ref: '418', custom: 'ZZZz', children: [] }
                ]
            }
        ]);
    });

    test('should ignore objects if parentId does not exist with dataField set to null', () => {
        expect(
            toTree(
                [
                    { id: '4', parentId: null, custom: 'abc' },
                    { id: '31', parentId: '4', custom: '12' },
                    { id: '1941', parentId: '418', custom: 'de' },
                    { id: '1', parentId: '418', custom: 'ZZZz' },
                    { id: '418', parentId: null, custom: 'ü' },
                    { id: '1313', parentId: '13', custom: 'Not existing' }
                ],
                { dataField: null }
            )
        ).toStrictEqual([
            {
                id: '4',
                parentId: null,
                custom: 'abc',
                children: [
                    { id: '31', parentId: '4', custom: '12', children: [] }
                ]
            },
            {
                id: '418',
                parentId: null,
                custom: 'ü',
                children: [
                    { id: '1941', parentId: '418', custom: 'de', children: [] },
                    { id: '1', parentId: '418', custom: 'ZZZz', children: [] }
                ]
            }
        ]);
    });

    test('should treat objects with missing parentId as root objects', () => {
        expect(
            toTree([
                { id: '4', custom: 'abc' },
                { id: '31', parentId: '4', custom: '12' },
                { id: '1941', parentId: '418', custom: 'de' },
                { id: '1', parentId: '418', custom: 'ZZZz' },
                { id: '418', custom: 'ü' },
                { id: '1313', parentId: '13', custom: 'Not existing' }
            ])
        ).toStrictEqual([
            {
                data: { id: '4', custom: 'abc' },
                children: [
                    {
                        data: { id: '31', parentId: '4', custom: '12' },
                        children: []
                    }
                ]
            },
            {
                data: { id: '418', custom: 'ü' },
                children: [
                    {
                        data: { id: '1941', parentId: '418', custom: 'de' },
                        children: []
                    },
                    {
                        data: { id: '1', parentId: '418', custom: 'ZZZz' },
                        children: []
                    }
                ]
            }
        ]);
    });

    test('should treat objects with empty string as parentId as root objects', () => {
        expect(
            toTree([
                { id: '4', parentId: '', custom: 'abc' },
                { id: '31', parentId: '4', custom: '12' },
                { id: '1941', parentId: '418', custom: 'de' },
                { id: '1', parentId: '418', custom: 'ZZZz' },
                { id: '418', parentId: '', custom: 'ü' },
                { id: '1313', parentId: '13', custom: 'Not existing' }
            ])
        ).toStrictEqual([
            {
                data: { id: '4', parentId: '', custom: 'abc' },
                children: [
                    {
                        data: { id: '31', parentId: '4', custom: '12' },
                        children: []
                    }
                ]
            },
            {
                data: { id: '418', parentId: '', custom: 'ü' },
                children: [
                    {
                        data: { id: '1941', parentId: '418', custom: 'de' },
                        children: []
                    },
                    {
                        data: { id: '1', parentId: '418', custom: 'ZZZz' },
                        children: []
                    }
                ]
            }
        ]);
    });

    test('should treat objects with non-zero length string as parentId as root objects if these parent ids are in rootParentIds', () => {
        expect(
            toTree(
                [
                    { id: '4', parentId: 'orphan1', custom: 'abc' },
                    { id: '31', parentId: '4', custom: '12' },
                    { id: '1941', parentId: '418', custom: 'de' },
                    { id: '1', parentId: '418', custom: 'ZZZz' },
                    { id: '418', parentId: 'orphan2', custom: 'ü' },
                    {
                        id: '1313',
                        parentId: 'orphan3',
                        custom: 'will be ignored'
                    }
                ],
                {
                    rootParentIds: { '': true, orphan1: true, orphan2: true }
                }
            )
        ).toStrictEqual([
            {
                data: { id: '4', parentId: 'orphan1', custom: 'abc' },
                children: [
                    {
                        data: { id: '31', parentId: '4', custom: '12' },
                        children: []
                    }
                ]
            },
            {
                data: { id: '418', parentId: 'orphan2', custom: 'ü' },
                children: [
                    {
                        data: { id: '1941', parentId: '418', custom: 'de' },
                        children: []
                    },
                    {
                        data: { id: '1', parentId: '418', custom: 'ZZZz' },
                        children: []
                    }
                ]
            }
        ]);
    });

    test('should not throw if orphans exist but throwIfOrphans is false', () => {
        expect(
            toTree([
                { id: '4', parentId: null, custom: 'abc' },
                { id: '31', parentId: '4', custom: '12' },
                { id: '418', parentId: '6', custom: 'ü' }
            ])
        ).toStrictEqual([
            {
                data: { id: '4', parentId: null, custom: 'abc' },
                children: [
                    {
                        data: { id: '31', parentId: '4', custom: '12' },
                        children: []
                    }
                ]
            }
        ]);
    });

    test('should throw if orphans exist and throwIfOrphans is true', () => {
        expect(() =>
            toTree(
                [
                    { id: '4', parentId: null, custom: 'abc' },
                    { id: '31', parentId: '4', custom: '12' },
                    { id: '418', parentId: '6', custom: 'ü' },
                    { id: '419', parentId: '418', custom: 'ü' },
                    { id: '420', parentId: '7', custom: 'ü' }
                ],
                { throwIfOrphans: true }
            )
        ).toThrow(
            'items 数组包含指向以下 parentIds 的孤立项: [6,7]\n' +
                '这些 parentIds 在 items 数组中不存在。提示：通过传递以下选项来防止孤儿节点导致的错误: {throwIfOrphans: false}'
        );
    });

    test('should not throw if no orphans exist and throwIfOrphans is true, but the order is different (see #18)', () => {
        expect(
            toTree(
                [
                    { id: '2', parentId: 'root', foo: 'bar' },
                    { id: '1-1', parentId: '1', foo: 'bar' },
                    { id: '1', parentId: 'root', foo: 'bar' },
                    { id: 'root', parentId: null, bar: 'bar' }
                ],
                { dataField: null, throwIfOrphans: true }
            )
        ).toStrictEqual([
            {
                id: 'root',
                parentId: null,
                bar: 'bar',
                children: [
                    { id: '2', parentId: 'root', foo: 'bar', children: [] },
                    {
                        id: '1',
                        parentId: 'root',
                        foo: 'bar',
                        children: [
                            {
                                id: '1-1',
                                parentId: '1',
                                foo: 'bar',
                                children: []
                            }
                        ]
                    }
                ]
            }
        ]);
    });

    test("should throw if orphans exist and throwIfOrphans is true and rootParentIds don't contain orphan parentId", () => {
        expect(() =>
            toTree(
                [
                    { id: '4', parentId: null, custom: 'abc' },
                    { id: '31', parentId: '4', custom: '12' },
                    { id: '418', parentId: '6', custom: 'ü' },
                    { id: '419', parentId: '418', custom: 'ü' },
                    { id: '420', parentId: '7', custom: 'ü' }
                ],
                {
                    rootParentIds: { '': true, '6': true },
                    throwIfOrphans: true
                }
            )
        ).toThrow(
            'items 数组包含指向以下 parentIds 的孤立项: [7]\n' +
                '这些 parentIds 在 items 数组中不存在。提示：通过传递以下选项来防止孤儿节点导致的错误: {throwIfOrphans: false}'
        );
    });

    test('should throw if a node has parentId that both exists in another node and is in rootParentIds', () => {
        expect(() =>
            toTree(
                [
                    { id: 'fakeOrphan', parentId: null },
                    { id: 'aaa', parentId: 'fakeOrphan' },
                    { id: 'bbb', parentId: 'aaa' },
                    { id: 'ccc', parentId: 'bbb' }
                ],
                {
                    rootParentIds: { '': true, fakeOrphan: true },
                    throwIfOrphans: true
                }
            )
        ).toThrow(
            'items 数组中包含一个节点，它的 parentId 既存在于另一个节点中又在 rootParentIds 中。' +
                '{itemId: "fakeOrphan", rootParentIds: ["","fakeOrphan"]}'
        );
    });

    test('should replace default rootParentIds by the provided value', () => {
        expect(
            toTree(
                [
                    { id: '4', parentId: '', custom: 'abc' },
                    { id: '31', parentId: '4', custom: '12' },
                    { id: '418', parentId: '6', custom: 'ü' }
                ],
                {
                    rootParentIds: { '6': true }
                }
            )
        ).toStrictEqual([
            { data: { id: '418', parentId: '6', custom: 'ü' }, children: [] }
        ]);
    });

    test('should work with empty inputs', () => {
        expect(toTree([])).toStrictEqual([]);
    });

    test('should work with nested objects and nested id and parentId properties', () => {
        expect(
            toTree(
                [
                    { nested: { id: '1', parentId: null, custom: '1' } },
                    { nested: { id: '1.1', parentId: '1', custom: '1.1' } },
                    {
                        nested: {
                            id: '1.1.1',
                            parentId: '1.1',
                            custom: '1.1.1'
                        }
                    },
                    { nested: { id: '1.2', parentId: '1', custom: '1.2' } },
                    { nested: { id: '2', parentId: null, custom: '2' } }
                ],
                { id: 'nested.id', parentId: 'nested.parentId' }
            )
        ).toStrictEqual([
            {
                data: { nested: { id: '1', parentId: null, custom: '1' } },
                children: [
                    {
                        data: {
                            nested: { id: '1.1', parentId: '1', custom: '1.1' }
                        },
                        children: [
                            {
                                data: {
                                    nested: {
                                        id: '1.1.1',
                                        parentId: '1.1',
                                        custom: '1.1.1'
                                    }
                                },
                                children: []
                            }
                        ]
                    },
                    {
                        data: {
                            nested: { id: '1.2', parentId: '1', custom: '1.2' }
                        },
                        children: []
                    }
                ]
            },
            {
                data: { nested: { id: '2', parentId: null, custom: '2' } },
                children: []
            }
        ]);
    });

    test('should work with nested id property', () => {
        expect(
            toTree(
                [
                    { one: { id: '1' }, parentId: null, custom: '1' },
                    { one: { id: '1.1' }, parentId: '1', custom: '1.1' }
                ],
                { id: 'one.id', parentId: 'parentId' }
            )
        ).toStrictEqual([
            {
                data: { one: { id: '1' }, parentId: null, custom: '1' },
                children: [
                    {
                        data: {
                            one: { id: '1.1' },
                            parentId: '1',
                            custom: '1.1'
                        },
                        children: []
                    }
                ]
            }
        ]);
    });

    test('should work with nested parentId property', () => {
        expect(
            toTree(
                [
                    { id: '1', two: { parentId: null }, custom: '1' },
                    { id: '1.1', two: { parentId: '1' }, custom: '1.1' }
                ],
                { id: 'id', parentId: 'two.parentId' }
            )
        ).toStrictEqual([
            {
                data: { id: '1', two: { parentId: null }, custom: '1' },
                children: [
                    {
                        data: {
                            id: '1.1',
                            two: { parentId: '1' },
                            custom: '1.1'
                        },
                        children: []
                    }
                ]
            }
        ]);
    });

    test('should work with nested id and parentId properties', () => {
        expect(
            toTree(
                [
                    { one: { id: '1' }, two: { parentId: null }, custom: '1' },
                    {
                        one: { id: '1.1' },
                        two: { parentId: '1' },
                        custom: '1.1'
                    }
                ],
                { id: 'one.id', parentId: 'two.parentId' }
            )
        ).toStrictEqual([
            {
                data: {
                    one: { id: '1' },
                    two: { parentId: null },
                    custom: '1'
                },
                children: [
                    {
                        data: {
                            one: { id: '1.1' },
                            two: { parentId: '1' },
                            custom: '1.1'
                        },
                        children: []
                    }
                ]
            }
        ]);
    });

    test('should work with nested id and parentId properties if the parent is null', () => {
        expect(
            toTree(
                [
                    { one: { id: '1' }, two: null, custom: '1' },
                    {
                        one: { id: '1.1' },
                        two: { parentId: '1' },
                        custom: '1.1'
                    }
                ],
                { id: 'one.id', parentId: 'two.parentId' }
            )
        ).toStrictEqual([
            {
                data: { one: { id: '1' }, two: null, custom: '1' },
                children: [
                    {
                        data: {
                            one: { id: '1.1' },
                            two: { parentId: '1' },
                            custom: '1.1'
                        },
                        children: []
                    }
                ]
            }
        ]);
    });

    test('should work with nested id and parentId properties if the parent is undefined', () => {
        expect(
            toTree(
                [
                    { one: { id: '1' }, custom: '1' },
                    {
                        one: { id: '1.1' },
                        two: { parentId: '1' },
                        custom: '1.1'
                    }
                ],
                { id: 'one.id', parentId: 'two.parentId' }
            )
        ).toStrictEqual([
            {
                data: { one: { id: '1' }, custom: '1' },
                children: [
                    {
                        data: {
                            one: { id: '1.1' },
                            two: { parentId: '1' },
                            custom: '1.1'
                        },
                        children: []
                    }
                ]
            }
        ]);
    });

    test('should keep prototype if assign is enabled', () => {
        const animal = {
            legs() {
                return 4;
            }
        };

        const mom = Object.create(animal);
        mom.id = 'mom';
        mom.parentId = null;
        const kitty = Object.create(animal);
        kitty.id = 'kitty';
        kitty.parentId = 'mom';

        const tree = toTree([mom, kitty], { dataField: null, assign: true });

        expect(tree).toStrictEqual([mom]);

        expect(tree[0].__proto__).toStrictEqual(animal);

        expect(tree[0].legs()).toEqual(4);
    });

    test('should not keep prototype if assign is disabled', () => {
        const animal = {
            legs() {
                return 4;
            }
        };

        const mom = Object.create(animal);
        mom.id = 'mom';
        mom.parentId = null;
        const kitty = Object.create(animal);
        kitty.id = 'kitty';
        kitty.parentId = 'mom';

        const tree = toTree([mom, kitty], { dataField: null, assign: false });

        expect(tree).toStrictEqual([
            {
                id: 'mom',
                parentId: null,
                children: [
                    {
                        id: 'kitty',
                        parentId: 'mom',
                        children: []
                    }
                ]
            }
        ]);

        expect(mom.legs()).toEqual(4);

        expect(tree[0].__proto__).toStrictEqual(Object.prototype);
        expect(tree[0].legs).toEqual(undefined);
    });

    test('should work with nested objects', () => {
        expect(
            countNodes(
                toTree([
                    { id: '4', parentId: null, custom: 'abc' },
                    { id: '31', parentId: '4', custom: '12' },
                    { id: '1941', parentId: '418', custom: 'de' },
                    { id: '1', parentId: '418', custom: 'ZZZz' },
                    { id: '418', parentId: null, custom: 'ü' }
                ]),
                'children'
            )
        ).toEqual(5);
    });

    test('should work for 1 node', () => {
        expect(
            countNodes(
                toTree([{ id: '4', parentId: null, custom: 'abc' }]),
                'children'
            )
        ).toEqual(1);
    });

    test('should work for 0 nodes', () => {
        expect(countNodes(toTree([]), 'children')).toEqual(0);
    });
});
