import { Duplex, Stream, Writable } from 'stream';

import { isWritable } from '..';

describe('@curong/types/isReadable', () => {
    test('测试1', () => {
        expect(isWritable(new Stream())).toBe(false);
    });

    test('测试2', () => {
        expect(isWritable(new Writable())).toBe(true);
        expect(isWritable(new Duplex())).toBe(true);
    });
});
