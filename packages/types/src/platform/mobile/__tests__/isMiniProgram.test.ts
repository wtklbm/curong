// @ts-nocheck

import { isMiniProgram } from '..';

const factory = {
    getSystemInfoSync() {
        return {};
    }
};

describe('@curong/types/isMiniProgram', () => {
    test('测试1', () => {
        expect(isMiniProgram()).toBe(false);
        expect(isMiniProgram('微信')).toBe(false);
        expect(isMiniProgram('百度')).toBe(false);
        expect(isMiniProgram(['微信', '支付宝'])).toBe(false);
    });

    test('测试2', () => {
        Object.assign(globalThis, {
            wx: factory,
            my: factory
        });
        expect(isMiniProgram()).toBe(true);
        expect(isMiniProgram('微信')).toBe(true);
        expect(isMiniProgram(['微信', '支付宝'])).toBe(true);
    });

    test('测试3', () => {
        expect(isMiniProgram('百度')).toBe(false);
        Object.assign(globalThis, {
            swan: factory
        });
        expect(isMiniProgram('百度')).toBe(true);
    });
});
