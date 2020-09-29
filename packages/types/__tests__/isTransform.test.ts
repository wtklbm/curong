import { isTransform } from '../src';

import { Stream, Duplex, Transform } from 'stream';

describe('@curong/types/isTransform', () => {
    test('测试1', () => {
        expect(isTransform(new Duplex())).toBe(false);
        expect(isTransform(new Stream())).toBe(false);
    });

    test('测试2', () => {
        expect(isTransform(new Transform())).toBe(true);
    });
});
