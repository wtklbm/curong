import { withDelimiter, WithDelimiterOptions } from '../src';

describe('@curong/number/withDelimiter', () => {
    test('测试1', () => {
        const options: WithDelimiterOptions = { delimiter: ',', capacity: 3 };
        expect(withDelimiter(123456789, options)).toBe('123,456,789');
    });

    test('测试2', () => {
        const options: WithDelimiterOptions = { delimiter: ',', capacity: 3 };
        expect(withDelimiter(123456789, options)).toBe('123,456,789');
    });

    test('测试3', () => {
        const options: WithDelimiterOptions = { delimiter: '_', capacity: 3 };
        expect(withDelimiter(123456789, options)).toBe('123_456_789');
    });

    test('测试4', () => {
        const options: WithDelimiterOptions = { delimiter: '_', capacity: 3 };
        expect(withDelimiter(123456789, options)).toBe('123_456_789');
    });

    test('测试5', () => {
        const options: WithDelimiterOptions = { delimiter: ',', capacity: 3 };
        expect(withDelimiter(1234567.89, options)).toBe('1,234,567.89');
    });

    test('测试6', () => {
        const options: WithDelimiterOptions = { delimiter: ',', capacity: 4 };
        expect(withDelimiter(123456789, options)).toBe('1,2345,6789');
    });

    test('测试7', () => {
        const options: WithDelimiterOptions = { delimiter: ',', capacity: 3 };
        // @ts-ignore
        expect(() => withDelimiter({}, options)).toThrow(TypeError);
    });

    test('测试8', () => {
        const options: WithDelimiterOptions = { delimiter: ',', capacity: 0 };
        expect(() => withDelimiter(123456789, options)).toThrow(Error);
    });

    test('测试9', () => {
        expect(withDelimiter(1234567)).toBe('1,234,567');
        expect(withDelimiter(1234567.89)).toBe('1,234,567.89');
        expect(withDelimiter('1234567')).toBe('1,234,567');
        expect(withDelimiter('1234567.89')).toBe('1,234,567.89');
        expect(withDelimiter('1000.')).toBe('1,000');
        expect(withDelimiter('.456')).toBe('.456');
        expect(withDelimiter('')).toBe('');
        expect(withDelimiter(-1234567)).toBe('-1,234,567');
    });
});
