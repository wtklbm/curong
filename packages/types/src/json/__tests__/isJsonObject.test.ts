import { isJsonObject } from '..';

describe('@curong/types/isJsonObject', () => {
    test('测试1: 输入为 null，返回 true', () => {
        expect(isJsonObject(null)).toBe(true);
    });

    test('测试2: 输入为字符串，返回 true', () => {
        expect(isJsonObject('string')).toBe(true);
    });

    test('测试3: 输入为布尔值，返回 true', () => {
        expect(isJsonObject(true)).toBe(true);
        expect(isJsonObject(false)).toBe(true);
    });

    test('测试4: 输入为有限数字，返回 true', () => {
        expect(isJsonObject(123)).toBe(true);
        expect(isJsonObject(0)).toBe(true);
    });

    test('测试5: 输入为无穷大或 NaN，返回 false', () => {
        expect(isJsonObject(Infinity)).toBe(false);
        expect(isJsonObject(-Infinity)).toBe(false);
        expect(isJsonObject(NaN)).toBe(false);
    });

    test('测试6: 输入为数组，且每个元素都是有效的 JSON 对象，返回 true', () => {
        expect(isJsonObject([1, 'string', true])).toBe(true);
        expect(isJsonObject([{'key': 'value'}, [1, 2], true])).toBe(true);
    });

    test('测试7: 输入为数组，且包含无效的元素，返回 false', () => {
        expect(isJsonObject([1, 'string', Infinity])).toBe(false);
        expect(isJsonObject([NaN, 'test'])).toBe(false);
    });

    test('测试8: 输入为简单的 JSON 对象，返回 true', () => {
        expect(isJsonObject({ key: 'value' })).toBe(true);
        expect(isJsonObject({ a: 1, b: 'test' })).toBe(true);
    });

    test('测试9: 输入为复杂的嵌套 JSON 对象，返回 true', () => {
        expect(isJsonObject({ a: { b: { c: 123 } } })).toBe(true);
        expect(isJsonObject({ key: ['val1', 'val2'], obj: { nested: true } })).toBe(true);
    });

    test('测试10: 输入为 JSON 对象，键名都会转换为字符串，返回 true', () => {
        expect(isJsonObject({ [Symbol('key')]: 'value' })).toBe(true);
        expect(isJsonObject({ ['undefined']: 'value' })).toBe(true);
    });

    test('测试11: 输入为包含无效值的 JSON 对象，返回 false', () => {
        expect(isJsonObject({ key: Infinity })).toBe(false);
        expect(isJsonObject({ key: NaN })).toBe(false);
    });

    test('测试12: 输入为空对象，返回 true', () => {
        expect(isJsonObject({})).toBe(true);
    });

    test('测试13: 输入为 null 或 undefined，返回 false', () => {
        expect(isJsonObject(undefined)).toBe(false);
    });
});
