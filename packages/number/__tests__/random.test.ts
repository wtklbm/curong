import { random } from '../src';

describe('@curong/number/random', () => {
    test('测试1', () => {
        for (let i = 0, len = 20, r, l; i < len; i++) {
            r = random();
            expect(r >= 0 && r <= 1).toBe(true);

            l = r.toString().length;
            expect(l >= 13 && l <= 23).toBe(true);
        }
    });
});
