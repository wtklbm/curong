import { rmControlLeft } from '../src';

describe('@curong/string/rmControlLeft', () => {
    test('测试1', () => {
        expect(rmControlLeft(`\b\r\nxx\vx\t\n`)).toBe('xx\vx\t\n');
    });
});
