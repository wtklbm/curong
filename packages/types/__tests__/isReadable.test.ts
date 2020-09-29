import { isReadable } from '../src';

import { Readable, Stream, Duplex } from 'stream';

describe('@curong/types/isReadable', () => {
    test('测试1', () => {
        expect(isReadable(new Stream())).toBe(false);
    });

    test('测试2', () => {
        expect(isReadable(new Readable())).toBe(true);
        expect(isReadable(new Duplex())).toBe(true);
    });
});
