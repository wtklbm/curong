import { rmControlStart } from '../src';

describe('@curong/string/rmControlStart', () => {
    test('测试1', () => {
        expect(rmControlStart(`\b\r\nxx\vx\t\n`)).toBe('xx\vx\t\n');
    });
});
