import { isWritable } from '../src';

import { Writable, Stream, Duplex } from 'stream';

describe('@curong/types/isReadable', () => {
    test('测试1', () => {
        expect(isWritable(new Stream())).toBe(false);
    });

    test('测试2', () => {
        expect(isWritable(new Writable())).toBe(true);
        expect(isWritable(new Duplex())).toBe(true);
    });
});
