/**
 * @jest-environment jsdom
 */

import { isBlob } from '..';

describe('@curong/types/isBlob', () => {
    test('测试1', () => {
        expect(isBlob(new Blob())).toBe(true);
    });
});
