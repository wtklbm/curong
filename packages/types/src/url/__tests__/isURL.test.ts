import { isURL } from '..';

describe('@curong/types/isURL', () => {
    test('测试1', () => {
        expect(isURL(12)).toBe(false);
    });

    test('测试2', () => {
        expect(isURL(new URL('https://www.q.com'))).toBe(true);
    });
});
