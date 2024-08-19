// @ts-nocheck

import { sortKeys } from '../src';

function deepEqualInOrder(actual, expected) {
    expect(actual).toEqual(expected);

    const seen = new Set();

    function assertSameKeysInOrder(object1, object2) {
        if (seen.has(object1) && seen.has(object2)) {
            return;
        }

        seen.add(object1);
        seen.add(object2);

        if (Array.isArray(object1)) {
            for (const index of object1.keys()) {
                assertSameKeysInOrder(object1[index], object2[index]);
            }
        } else if (typeof object1 === 'object') {
            const keys1 = Object.keys(object1);
            const keys2 = Object.keys(object2);
            expect(keys1).toEqual(keys2);
            for (const index of keys1.keys()) {
                assertSameKeysInOrder(
                    object1[keys1[index]],
                    object2[keys2[index]]
                );
            }
        }
    }

    assertSameKeysInOrder(actual, expected);
}

describe('@curong/object/sortKeys', () => {
    test('测试1', () => {
        expect(() => sortKeys(null)).toThrow();
        expect(() => sortKeys(undefined)).toThrow();
        expect(() => sortKeys(() => { })).toThrow();
        expect(() => sortKeys(1)).toThrow();
        expect(() => sortKeys(false)).toThrow();
        expect(() => sortKeys(Object.create(null))).toThrow();
    });

    test('测试2', () => {
        const compare = (a, b) => b.localeCompare(a);
        deepEqualInOrder(sortKeys({ c: 0, a: 0, b: 0 }, { compare }), {
            c: 0,
            b: 0,
            a: 0
        });
    });

    test('测试3', () => {
        deepEqualInOrder(sortKeys({ c: 0, a: 0, b: 0 }), { a: 0, b: 0, c: 0 });
        deepEqualInOrder(
            sortKeys({ c: { c: 0, a: 0, b: 0 }, a: 0, b: 0 }, { deep: true }),
            { a: 0, b: 0, c: { a: 0, b: 0, c: 0 } }
        );

        expect(() => {
            const object = { a: 0 };
            object.circular = object;
            sortKeys(object, { deep: true });
        }).not.toThrow();

        const object = { z: 0 };
        object.circular = object;
        const sortedObject = sortKeys(object, { deep: true });

        expect(sortedObject).toBe(sortedObject.circular);
        expect(Object.keys(sortedObject)).toEqual(['circular', 'z']);

        const object1 = { b: 0 };
        const object2 = { d: 0 };
        const object3 = { a: [{ b: 0 }] };
        const object4 = { a: [{ d: 0 }] };

        object1.a = object2;
        object2.c = object1;
        object3.a[0].a = object4.a[0];
        object4.a[0].c = object3.a[0];

        expect(() => {
            sortKeys(object1, { deep: true });
            sortKeys(object2, { deep: true });
            sortKeys(object3, { deep: true });
            sortKeys(object4, { deep: true });
        }).not.toThrow();

        const sorted = sortKeys(object1, { deep: true });
        const deepSorted = sortKeys(object3, { deep: true });

        expect(sorted).toBe(sorted.a.c);
        deepEqualInOrder(deepSorted.a[0], deepSorted.a[0].a.c);
        expect(Object.keys(sorted)).toEqual(['a', 'b']);
        expect(Object.keys(deepSorted.a[0])).toEqual(['a', 'b']);
        deepEqualInOrder(
            sortKeys(
                { c: { c: 0, a: 0, b: 0 }, a: 0, b: 0, z: [9, 8, 7, 6, 5] },
                { deep: true }
            ),
            { a: 0, b: 0, c: { a: 0, b: 0, c: 0 }, z: [9, 8, 7, 6, 5] }
        );
        expect(
            Object.keys(sortKeys({ a: [{ b: 0, a: 0 }] }, { deep: true }).a[0])
        ).toEqual(['a', 'b']);
    });

    test('测试4', () => {
        const object = {
            b: 0,
            a: [{ b: 0, a: 0 }, [{ b: 0, a: 0 }]]
        };
        object.a.push(object);
        object.a[1].push(object.a[1]);

        expect(() => {
            sortKeys(object, { deep: true });
        }).not.toThrow();

        const sorted = sortKeys(object, { deep: true });
        expect(sorted.a[2]).toBe(sorted);
        expect(sorted.a[1][1]).toBe(sorted.a[1]);
        expect(Object.keys(sorted)).toEqual(['a', 'b']);
        expect(Object.keys(sorted.a[0])).toEqual(['a', 'b']);
        expect(Object.keys(sorted.a[1][0])).toEqual(['a', 'b']);
    });

    test('测试5', () => {
        const array = [
            { b: 0, a: 0 },
            { c: 0, d: 0 }
        ];
        const sorted = sortKeys(array);
        expect(sorted).not.toBe(array);
        expect(sorted[0]).toBe(array[0]);
        expect(sorted[1]).toBe(array[1]);

        const deepSorted = sortKeys(array, { deep: true });
        expect(deepSorted).not.toBe(array);
        expect(deepSorted[0]).not.toBe(array[0]);
        expect(deepSorted[1]).not.toBe(array[1]);
        expect(Object.keys(deepSorted[0])).toEqual(['a', 'b']);
        expect(Object.keys(deepSorted[1])).toEqual(['c', 'd']);
    });

    test('测试6', () => {
        const descriptors = {
            b: {
                value: 1,
                configurable: true,
                enumerable: true,
                writable: false
            },
            a: {
                value: 2,
                configurable: false,
                enumerable: true,
                writable: true
            }
        };

        const object = {};
        Object.defineProperties(object, descriptors);

        const sorted = sortKeys(object);

        deepEqualInOrder(sorted, { a: 2, b: 1 });
        expect(Object.getOwnPropertyDescriptors(sorted)).toEqual(descriptors);
    });
});
