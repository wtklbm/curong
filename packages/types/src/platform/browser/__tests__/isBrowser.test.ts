/**
 * @jest-environment jsdom
 */

import isFuzzyBrowser from '../../constants/isFuzzyBrowser';
import isFuzzyJsDom from '../../constants/isFuzzyJsDom';

import { isBrowser } from '..';

describe('@curong/types/isBrowser', () => {
    test('测试1', () => {
        expect(isBrowser()).toBe(false);
        expect(isFuzzyBrowser()).toBe(true);
        expect(isFuzzyJsDom()).toBe(true);
    });
});
