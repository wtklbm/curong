import { isSafeURLString } from '..';

describe('@curong/types/isSafeURLString', () => {
    test('测试1', () => {
        expect(isSafeURLString(12)).toBe(false);
    });

    test('测试2', () => {
        expect(isSafeURLString('https://www.q.com')).toBe(true);
        expect(
            isSafeURLString(`https://www.q.com/${'x'.padStart(2000 - 18, 'x')}`)
        ).toBe(true);

        expect(
            isSafeURLString(`https://www.q.com/${'x'.padStart(2000 - 17, 'x')}`)
        ).toBe(false);
    });
});
