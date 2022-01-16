import { rmControlEnd } from '../src';

describe('@curong/string/rmControlEnd', () => {
    test('测试1', () => {
        expect(rmControlEnd(`\r\r\nxx\vx\t\n`)).toBe('\r\r\nxx\vx');
    });
});
