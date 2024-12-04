import { uniqueByKey } from '..';

describe('@curong/array/uniqueByKey', () => {
    test('测试1: 使用对象的某个属性进行去重', () => {
        const array = [{ id: 1 }, { id: 2 }, { id: 1 }];
        const result = uniqueByKey(array, 'id');
        expect(result).toEqual([{ id: 1 }, { id: 2 }]);
    });

    test('测试2: 使用自定义函数进行去重', () => {
        const array = [{ name: 'John' }, { name: 'Jane' }, { name: 'John' }];
        const result = uniqueByKey(array, (item) => item.name);
        expect(result).toEqual([{ name: 'John' }, { name: 'Jane' }]);
    });

    test('测试3: 数组中所有元素唯一，返回原数组', () => {
        const array = [{ id: 1 }, { id: 2 }, { id: 3 }];
        const result = uniqueByKey(array, 'id');
        expect(result).toEqual(array);
    });

    test('测试4: 数组为空，返回空数组', () => {
        const result = uniqueByKey([], 'id');
        expect(result).toEqual([]);
    });

    test('测试5: 对象属性为 null 或 undefined 进行去重', () => {
        const array = [{ id: null }, { id: undefined }, { id: null }];
        const result = uniqueByKey(array, 'id');
        expect(result).toEqual([{ id: null }, { id: undefined }]);
    });

    test('测试6: 数组中包含非对象元素，且使用自定义函数进行去重', () => {
        const array = [1, 2, 3, 2, 1];
        const result = uniqueByKey(array, (item) => item);
        expect(result).toEqual([1, 2, 3]);
    });

    test('测试7: 数组包含嵌套对象，使用自定义函数进行去重', () => {
        const array = [{ user: { id: 1 } }, { user: { id: 2 } }, { user: { id: 1 } }];
        const result = uniqueByKey(array, (item) => item.user.id);
        expect(result).toEqual([{ user: { id: 1 } }, { user: { id: 2 } }]);
    });

    test('测试8: 数组元素是相同的引用，去重后返回一个元素', () => {
        const obj = { id: 1 };
        const array = [obj, obj, obj];
        const result = uniqueByKey(array, 'id');
        expect(result).toEqual([obj]);
    });

    test('测试9: 使用非 function 类型的 key，返回去重后的数组', () => {
        const array = [{ id: 'a' }, { id: 'b' }, { id: 'a' }];
        const result = uniqueByKey(array, 'id');
        expect(result).toEqual([{ id: 'a' }, { id: 'b' }]);
    });

    test('测试10: 使用自定义函数进行去重时，返回去重后的数组', () => {
        const array = [{ name: 'apple' }, { name: 'orange' }, { name: 'apple' }];
        const result = uniqueByKey(array, (item) => item.name);
        expect(result).toEqual([{ name: 'apple' }, { name: 'orange' }]);
    });
});
