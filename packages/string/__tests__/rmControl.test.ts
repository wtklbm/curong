import { rmControl } from '../src';

describe('@curong/string/rmControl', () => {
    test('测试1', () => {
        expect(rmControl(`\b\r\nxx\vx\t\n`)).toBe('xxx');
    });
});
