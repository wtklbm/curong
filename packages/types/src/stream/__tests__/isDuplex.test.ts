import { Duplex, Stream, Transform } from 'stream';

import { isDuplex } from '..';

describe('@curong/types/isDuplex', () => {
    test('测试1', () => {
        expect(isDuplex(new Stream())).toBe(false);
    });

    test('测试2', () => {
        expect(isDuplex(new Duplex())).toBe(true);
        expect(isDuplex(new Transform())).toBe(true);
    });
});
