import { isULID } from '..';

describe('@curong/regexp/isULID', () => {
    test('测试1', () => {
        expect(isULID('')).toBe(false);
        expect(isULID('this-is-not-a-ulid')).toBe(false);
        expect(isULID('01ARZ3NDEKTSV4RRFFQ69G5FAVZ')).toBe(false);
        expect(isULID('23bc826e-e366-403e-bbe8-e28cdb960584')).toBe(false)
        expect(isULID('01ED8ABHD21XTZJMRW6ZMEGPSSS')).toBe(false)
        expect(isULID('01ED8ABHD21XTZJMRW6ZMEGPSI')).toBe(false)
        expect(isULID('01ED8ABHD21XTZJMRW6ZMEGPSL')).toBe(false)
        expect(isULID('01ED8ABHD21XTZJMRW6ZMEGPSO')).toBe(false)
        expect(isULID('01ED8ABHD21XTZJMRW6ZMEGPSU')).toBe(false)
    });

    test('测试2', () => {
        expect(isULID('01ARZ3NDEKTSV4RRFFQ69G5FAV')).toBe(true);
        expect(isULID('01ED8ABHD21XTZJMRW6ZMEGPSS')).toBe(true)
    });
});
