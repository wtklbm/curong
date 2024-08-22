import { toLocaleString, ToLocaleStringOptions } from '../src';

describe('toLocaleString', () => {
    test('测试1', () => {
        const options: ToLocaleStringOptions = { delimiter: ',', capacity: 3 };
        expect(toLocaleString(123456789, options)).toBe('123,456,789');
    });

    test('测试2', () => {
        const options: ToLocaleStringOptions = { delimiter: ',', capacity: 3 };
        expect(toLocaleString(123456789, options)).toBe('123,456,789');
    });

    test('测试3', () => {
        const options: ToLocaleStringOptions = { delimiter: '_', capacity: 3 };
        expect(toLocaleString(123456789, options)).toBe('123_456_789');
    });

    test('测试4', () => {
        const options: ToLocaleStringOptions = { delimiter: '_', capacity: 3 };
        expect(toLocaleString(123456789, options)).toBe('123_456_789');
    });

    test('测试5', () => {
        const options: ToLocaleStringOptions = { delimiter: ',', capacity: 3 };
        expect(toLocaleString(1234567.89, options)).toBe('1,234,567.89');
    });

    test('测试6', () => {
        const options: ToLocaleStringOptions = { delimiter: ',', capacity: 4 };
        expect(toLocaleString(123456789, options)).toBe('1,2345,6789');
    });

    test('测试7', () => {
        const options: ToLocaleStringOptions = { delimiter: ',', capacity: 3 };
        // @ts-ignore
        expect(() => toLocaleString({}, options)).toThrow(TypeError);
    });

    test('测试8', () => {
        const options: ToLocaleStringOptions = { delimiter: ',', capacity: 0 };
        expect(() => toLocaleString(123456789, options)).toThrow(Error);
    });

    test('测试9', () => {
        expect(toLocaleString(1234567)).toBe('1,234,567');
        expect(toLocaleString(1234567.89)).toBe('1,234,567.89');
        expect(toLocaleString('1234567')).toBe('1,234,567');
        expect(toLocaleString('1234567.89')).toBe('1,234,567.89');
        expect(toLocaleString('1000.')).toBe('1,000');
        expect(toLocaleString('.456')).toBe('.456');
        expect(toLocaleString('')).toBe('');
        expect(toLocaleString(-1234567)).toBe('-1,234,567');
    });
});
