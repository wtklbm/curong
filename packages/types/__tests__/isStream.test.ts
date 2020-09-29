import { isStream } from '../src';

import { Stream } from 'stream';

describe('@curong/types/isStream', () => {
    test('测试1', () => {
        expect(isStream({})).toBe(false);
    });

    test('测试2', () => {
        expect(isStream(new Stream())).toBe(true);
    });
});
