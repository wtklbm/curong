/**
 * @jest-environment jsdom
 */

import isFuzzyBrowser from '../../constants/isFuzzyBrowser';
import isFuzzyJsDom from '../../constants/isFuzzyJsDom';

import { isJsDom } from '..';

describe('@curong/types/isJsDom', () => {
    test('测试1', () => {
        expect(isJsDom()).toBe(true);
        expect(isFuzzyBrowser()).toBe(true);
        expect(isFuzzyJsDom()).toBe(true);
    });
});
