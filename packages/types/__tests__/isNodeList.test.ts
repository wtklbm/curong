/**
 * @jest-environment jsdom
 */

import { isNodeList } from '../src';

describe('@curong/types/isNodeList', () => {
    test('测试1', () => {
        expect(isNodeList('')).toBe(false);
        expect(isNodeList(document.querySelectorAll('body'))).toBe(true);
    });
});
