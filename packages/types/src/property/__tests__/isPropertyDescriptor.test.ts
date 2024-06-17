import { isPropertyDescriptor } from '..';

describe('@curong/types/isPropertyDescriptor', () => {
    test('测试1', () => {
        expect(isPropertyDescriptor(null)).toBe(false);
        expect(isPropertyDescriptor(undefined)).toBe(false);
        expect(isPropertyDescriptor(function () {})).toBe(false);
        expect(isPropertyDescriptor([])).toBe(false);
        expect(isPropertyDescriptor({})).toBe(false);
    });

    test('测试2', () => {
        const o1 = { value: 0, x: 0 };

        const o2 = {
            x: 0,
            get() {
                return 0;
            }
        };

        const o3 = {
            x: 0,
            set(value: any) {}
        };

        const o4 = {
            x: 0,
            set(value: any) {},
            get() {
                return 0;
            }
        };

        const o5 = {
            x: 0,
            value: 0,
            get() {
                return 0;
            }
        };

        const o6 = {
            x: 0,
            value: 0,
            set(value: any) {}
        };

        const o7 = {
            x: 0,
            value: 0,
            set(value: any) {},
            get() {
                return 0;
            }
        };

        const o8 = {
            x: 0,
            value: 0,
            set: [],
            get() {
                return 0;
            }
        };

        const o9 = {
            x: 0,
            value: 0,
            configurable: true,
            enumerable: true,
            writable: true
        };

        const o10 = {
            x: 0,
            value: 0,
            configurable: '',
            enumerable: true,
            writable: true
        };

        const o11 = {
            value: 0,
            configurable: false,
            enumerable: true,
            writable: true
        };

        expect(isPropertyDescriptor(o1)).toBe(true);
        expect(isPropertyDescriptor(o2)).toBe(true);
        expect(isPropertyDescriptor(o3)).toBe(true);
        expect(isPropertyDescriptor(o4)).toBe(true);
        expect(isPropertyDescriptor(o5)).toBe(false);
        expect(isPropertyDescriptor(o6)).toBe(false);
        expect(isPropertyDescriptor(o7)).toBe(false);
        expect(isPropertyDescriptor(o8)).toBe(false);
        expect(isPropertyDescriptor(o9)).toBe(true);
        expect(isPropertyDescriptor(o10)).toBe(false);
        expect(isPropertyDescriptor(o11)).toBe(true);

        expect(isPropertyDescriptor(o1, false)).toBe(false);
        expect(isPropertyDescriptor(o2, false)).toBe(false);
        expect(isPropertyDescriptor(o3, false)).toBe(false);
        expect(isPropertyDescriptor(o4, false)).toBe(false);
        expect(isPropertyDescriptor(o5, false)).toBe(false);
        expect(isPropertyDescriptor(o6, false)).toBe(false);
        expect(isPropertyDescriptor(o7, false)).toBe(false);
        expect(isPropertyDescriptor(o8, false)).toBe(false);
        expect(isPropertyDescriptor(o9, false)).toBe(false);
        expect(isPropertyDescriptor(o10, false)).toBe(false);
        expect(isPropertyDescriptor(o11, false)).toBe(true);
    });
});
