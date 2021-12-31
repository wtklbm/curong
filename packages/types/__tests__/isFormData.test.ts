/**
 * @jest-environment jsdom
 */

import { isFormData } from '../src';

describe('@curong/types/isFormData', () => {
    test('测试1', () => {
        expect(isFormData({})).toBe(false);
        expect(isFormData(new FormData())).toBe(true);
    });
});
