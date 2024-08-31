import { randomNumber } from '..';

describe('@curong/string/randomNumber', () => {
    test('测试1', () => {
        expect(randomNumber()?.length).toBe(15);

        [
            1,
            15,
            65536,
            65537,
            65537 * 1.5,
            65537 * 1.9,
            65537 * 2,
            65537 * 2.1
        ].forEach(v => {
            v = Math.floor(v);
            expect(randomNumber(v)?.length).toBe(v);
        });

        for (let i = 0, len = 10000, v; i < len; i++) {
            v = randomNumber();
            if (v.length !== 15) {
                throw new Error(`长度不相等: ${v}`);
            }
        }
    });
});
