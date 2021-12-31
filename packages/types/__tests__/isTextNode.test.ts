/**
 * @jest-environment jsdom
 */

import { isTextNode } from '../src';

describe('@curong/types/isTextNode', () => {
    test('测试1', () => {
        expect(isTextNode({})).toBe(false);
        expect(isTextNode(new Text())).toBe(true);
        expect(isTextNode(document.createTextNode(''))).toBe(true);
    });
});
