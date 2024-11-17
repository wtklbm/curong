// @ts-nocheck

import { isJsonString } from '..';

describe('@curong/types/isJsonString', () => {
    test('测试1', () => {
        expect(isJsonString(new Function())).toBe(false);
        expect(isJsonString(0)).toBe(false);
        expect(isJsonString(false)).toBe(false);
        expect(isJsonString(NaN)).toBe(false);
        expect(isJsonString(Infinity)).toBe(false);
        expect(isJsonString(undefined)).toBe(false);
        expect(isJsonString(null)).toBe(false);
        expect(isJsonString(Promise)).toBe(false);
        expect(isJsonString(Promise.resolve())).toBe(false);
        expect(isJsonString({})).toBe(false);
        expect(isJsonString({ then() {} })).toBe(false);
        expect(isJsonString((() => {})())).toBe(false);
        expect(isJsonString('')).toBe(false);
        expect(isJsonString([])).toBe(false);
        expect(isJsonString(new Set())).toBe(false);
        expect(isJsonString(new WeakSet())).toBe(false);
        expect(isJsonString(new Map())).toBe(false);
        expect(isJsonString(new WeakMap())).toBe(false);
        expect(isJsonString((function* () {})())).toBe(false);
    });

    test('测试2', () => {
        expect(isJsonString('asd[]ada sd asd das das')).toBe(false);
        expect(isJsonString(null)).toBe(false);
        expect(isJsonString(false)).toBe(false);
        expect(isJsonString('')).toBe(false);
        expect(isJsonString('normal string')).toBe(false);
        expect(isJsonString(2014)).toBe(false);
        expect(isJsonString(2014.5)).toBe(false);
        expect(isJsonString([1, 2, 3, 4])).toBe(false);
        expect(isJsonString({ a: 12, b: [1, 2, 3] })).toBe(false);
        expect(isJsonString({ a: 12, b: [1, 2, 3] }, true)).toBe(false);
        expect(isJsonString('{ a: 12, b: [1, 2, 3] }')).toBe(false);
        expect(isJsonString('{ a: 12, b: [1, 2, 3] }', true)).toBe(false);
        expect(isJsonString('{ "a": 12, "b": [1, 2, 3] }')).toBe(true);
        expect(isJsonString('{ "a": 12, "b": [1, 2, 3] }', true)).toBe(true);
        expect(
            isJsonString('{"a":"obj","b":[0,1,2],"c":{"d":"some object"}}')
        ).toBe(true);
        expect(isJsonString('1,2,3')).toBe(false);
        expect(isJsonString('{1,2,3}')).toBe(false);
        expect(isJsonString('[{"a": 123}, {1,2,3}}]')).toBe(false);

        const obj =
            '[{"a": {"aa": [1,2,3,4], "aaa": {"d": 1212}}}, {"b": "test", "c": [1,2,3], "date": "' +
            new Date() +
            '"}]';
        expect(isJsonString(obj)).toBe(true);
        expect(isJsonString(new Date())).toBe(false);
        expect(isJsonString('{\n "config": 123,\n "test": "abcde" \n}')).toBe(
            true
        );
        expect(isJsonString('{ "a": 1 }')).toBe(true);
    });

    test('测试3', () => {
        const obj = { a: '1' };
        obj.b = obj;
        const bj = '{ "a": 1, "b": obj}';

        expect(isJsonString(bj)).toBe(false);
    });

    test('测试4', () => {
        expect(isJsonString('[]')).toBe(true);
        expect(isJsonString('{}')).toBe(true);
        expect(isJsonString('{ "": 0 }')).toBe(true);
    });

    test('测试5', () => {
        expect(isJsonString('null')).toBe(true);
        expect(isJsonString('false')).toBe(true);
        expect(isJsonString('true')).toBe(true);
        expect(isJsonString('1234')).toBe(true);
        expect(isJsonString('{ "key": "value" }')).toBe(true);

        expect(isJsonString('{ key: "value" }')).toBe(false);
        expect(isJsonString("{ 'key': 'value' }")).toBe(false);
        expect(isJsonString('nope')).toBe(false);
    });
});
