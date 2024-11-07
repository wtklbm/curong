// @ts-nocheck

import { isMiniProgramWebView } from '..';

const userAgent = globalThis.navigator.userAgent;

Object.defineProperty(globalThis.navigator, 'userAgent', {
    value: userAgent,
    writable: true
});

describe('@curong/types/isMiniProgramWebView', () => {
    test('非小程序 WebView 环境', () => {
        expect(isMiniProgramWebView()).toBe(false);
    });

    test('微信', () => {
        globalThis.navigator.userAgent = 'miniProgram';
        expect(isMiniProgramWebView()).toBe(true);
        globalThis.navigator.userAgent = userAgent;
        expect(isMiniProgramWebView()).toBe(false);
    });

    test('QQ', () => {
        globalThis.navigator.userAgent = 'miniProgram';
        expect(isMiniProgramWebView()).toBe(true);
        globalThis.navigator.userAgent = userAgent;
        expect(isMiniProgramWebView()).toBe(false);
    });

    test('支付宝', () => {
        globalThis.navigator.userAgent = 'MiniProgram';
        expect(isMiniProgramWebView()).toBe(true);
        globalThis.navigator.userAgent = userAgent;
        expect(isMiniProgramWebView()).toBe(false);
    });

    test('抖音', () => {
        globalThis.navigator.userAgent = 'ToutiaoMicroApp';
        expect(isMiniProgramWebView()).toBe(true);
        globalThis.navigator.userAgent = userAgent;
        expect(isMiniProgramWebView()).toBe(false);
    });

    test('百度', () => {
        globalThis.navigator.userAgent = 'swan/1.0';
        expect(isMiniProgramWebView()).toBe(true);
        globalThis.navigator.userAgent = userAgent;

        expect(isMiniProgramWebView()).toBe(false);
    });

    test('京东', () => {
        globalThis.navigator.userAgent = 'jdmp';
        expect(isMiniProgramWebView()).toBe(true);
        globalThis.navigator.userAgent = userAgent;

        expect(isMiniProgramWebView()).toBe(false);
    });

    test('钉钉', () => {
        globalThis.navigator.userAgent = 'dingtalk';
        expect(isMiniProgramWebView()).toBe(true);
        globalThis.navigator.userAgent = userAgent;
        expect(isMiniProgramWebView()).toBe(false);
    });
});
