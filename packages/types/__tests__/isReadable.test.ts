import { Duplex, Readable, Stream } from 'stream';

import { isReadable } from '../src';

describe('@curong/types/isReadable', () => {
    test('测试1', () => {
        expect(isReadable(new Stream())).toBe(false);
    });

    test('测试2', () => {
        expect(isReadable(new Readable())).toBe(true);
        expect(isReadable(new Duplex())).toBe(true);
    });
});
