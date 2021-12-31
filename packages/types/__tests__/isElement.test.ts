/**
 * @jest-environment jsdom
 */

import { isElement } from '../src';

describe('@curong/types/isElement', () => {
    test('测试1', () => {
        expect(isElement({})).toBe(false);
        expect(isElement(Document)).toBe(false);
        expect(isElement(Window)).toBe(false);
        expect(isElement(document.getRootNode())).toBe(false);
    });

    test('测试2', () => {
        expect(isElement(document.body)).toBe(true);
        expect(isElement(document.querySelector('html'))).toBe(true);
        expect(isElement(document.createElement('img'))).toBe(true);
    });
});
