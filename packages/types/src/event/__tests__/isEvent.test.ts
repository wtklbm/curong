/**
 * @jest-environment jsdom
 */

import { isEvent } from '..';

describe('@curong/types/isEvent', () => {
    test('测试1', () => {
        expect(isEvent(new Event('a'))).toBe(true);
        expect(isEvent(new CustomEvent('a'))).toBe(true);
    });
});
