import { rmControlRight } from '../src';

describe('@curong/string/rmControlRight', () => {
    test('测试1', () => {
        expect(rmControlRight(`\r\r\nxx\vx\t\n`)).toBe('\r\r\nxx\vx');
    });
});
