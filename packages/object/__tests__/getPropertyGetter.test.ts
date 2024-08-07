import { getPropertyGetter } from '../src';

describe('@curong/util/getPropertyGetter', () => {
    test('测试1', () => {
        const getName = getPropertyGetter('name');
        const obj = { name: 'Alice', age: 30 };
        expect(getName(obj)).toBe('Alice');
    });

    test('测试2', () => {
        const getName = getPropertyGetter('name');
        expect(getName(undefined)).toBeUndefined();
        expect(getName(null)).toBeUndefined();
    });

    test('测试3', () => {
        const getName = getPropertyGetter('name');
        const obj = { age: 30 };
        expect(getName(obj)).toBeUndefined();
    });

    test('测试4', () => {
        const sym = Symbol('test');
        const getSym = getPropertyGetter(sym);
        const obj = { [sym]: 'symbol value' };
        expect(getSym(obj)).toBe('symbol value');
    });

    test('测试5', () => {
        const getProp = getPropertyGetter(123);
        const obj = { 123: 'number key' };
        expect(getProp(obj)).toBe('number key');
    });
});
