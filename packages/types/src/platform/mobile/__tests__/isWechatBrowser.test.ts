// @ts-nocheck

import { isWechatBrowser } from '..';

const userAgent = globalThis.navigator.userAgent;

Object.defineProperty(globalThis.navigator, 'userAgent', {
    value: userAgent,
    writable: true
});

describe('@curong/types/isWechatBrowser', () => {
    test('测试1', async () => {
        globalThis.navigator.userAgent = 'x';
        expect(isWechatBrowser()).toBe(false);
    });

    test('测试2', async () => {
        globalThis.navigator.userAgent = 'xx MicroMessenger yy';
        expect(isWechatBrowser()).toBe(true);
        globalThis.navigator.userAgent = userAgent;
        expect(isWechatBrowser()).toBe(false);
    });
});
