import { shallowEqual } from '../src';

describe('@curong/object/shallowEqual', () => {
    test('测试1', () => {
        expect(shallowEqual({}, {})).toBe(true);

        const o1 = {
            name: 'wtklbm'
        };

        const o2 = {
            name: 'wtklbm'
        };

        const o3 = {
            data: 'text'
        };

        const o4 = {
            name: 'wtklbm',
            data: 'text'
        };

        const o5 = {
            name: {
                data: 'wtklbm'
            }
        };

        const o6 = {
            name: {
                data: 'wtklbm'
            }
        };

        expect(shallowEqual(o1, o2)).toBe(true);
        expect(shallowEqual(o1, null)).toBe(false);
        expect(shallowEqual(null, o2)).toBe(false);
        expect(shallowEqual(o1, o3)).toBe(false);
        expect(shallowEqual(o1, o4)).toBe(false);
        expect(shallowEqual(o5, o6)).toBe(false);
    });
});
