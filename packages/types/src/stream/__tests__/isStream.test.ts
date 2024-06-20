import { Duplex, Readable, Stream, Transform, Writable } from 'stream';

import { isStream } from '..';

describe('@curong/types/isStream', () => {
    test('测试1', () => {
        expect(isStream({})).toBe(false);
    });

    test('测试2', () => {
        expect(isStream(new Stream())).toBe(true);
        expect(isStream(new Duplex())).toBe(true);
        expect(isStream(new Transform())).toBe(true);
        expect(isStream(new Writable())).toBe(true);
        expect(isStream(new Readable())).toBe(true);
    });
});
