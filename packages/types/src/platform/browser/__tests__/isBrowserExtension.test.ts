import { isBrowserExtension } from '..';

describe('@curong/types/isBrowserExtension', () => {
    test('测试1', () => {
        globalThis.chrome = {
            runtime: {
                id: 'xxx'
            }
        };
        expect(isBrowserExtension()).toBe(true);
        globalThis.chrome = {};
        expect(isBrowserExtension()).toBe(false);
    });

    test('测试2', () => {
        globalThis.browser = {
            runtime: {
                id: 'xxx'
            }
        };
        expect(isBrowserExtension()).toBe(true);
        globalThis.browser = {};
        expect(isBrowserExtension()).toBe(false);
    });

    test('测试3', () => {
        expect(isBrowserExtension()).toBe(false);
        globalThis.browser = {};
        expect(isBrowserExtension()).toBe(false);
        globalThis.browser = {
            // @ts-ignore
            runtime: null
        };
        expect(isBrowserExtension()).toBe(false);
        globalThis.browser = {
            runtime: {
                id: null
            }
        };
        expect(isBrowserExtension()).toBe(false);
        globalThis.browser = {};
        expect(isBrowserExtension()).toBe(false);
    });
});
