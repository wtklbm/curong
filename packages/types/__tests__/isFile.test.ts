/**
 * @jest-environment jsdom
 */

import { isFile } from '../src';

describe('@curong/types/isFile', () => {
    test('测试1', () => {
        expect(isFile(new TypeError(''))).toBe(false);
    });

    test('测试2', () => {
        expect(isFile(new File(['x'], 'test'))).toBe(true);
    });
});
