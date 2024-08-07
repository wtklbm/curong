import { getProperty } from '../src';

describe('@curong/util/getProperty', () => {
    test('测试1', () => {
        expect(getProperty(undefined, 'name')).toBeUndefined();
        expect(getProperty(null, 'name')).toBeUndefined();
    });

    test('测试2', () => {
        expect(getProperty({ name: 'Alice', age: 30 }, 'name')).toBe('Alice');
        expect(getProperty({ age: 30 }, 'name')).toBeUndefined();
    });

    test('测试4', () => {
        expect(getProperty({ 123: 'number key' }, 123)).toBe('number key');
    });

    test('测试5', () => {
        const sym = Symbol('test');
        expect(getProperty({ [sym]: 'symbol value' }, sym)).toBe(
            'symbol value'
        );
    });

    test('测试6', () => {
        const obj = {};
        Object.defineProperty(obj, 'value', {
            value: 'hidden',
            enumerable: false,
            writable: true,
            configurable: true
        });

        expect(getProperty(obj, 'value')).toBe('hidden');
    });
});
