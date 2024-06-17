/**
 * @jest-environment jsdom
 */

import { isFileReader } from '..';

describe('@curong/types/isFileReader', () => {
    test('测试1', () => {
        expect(isFileReader(new TypeError(''))).toBe(false);
    });

    test('测试2', () => {
        expect(isFileReader(new FileReader())).toBe(true);
    });
});
