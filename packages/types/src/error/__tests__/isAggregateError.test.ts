// @ts-nocheck

import { isAggregateError } from '..';

describe('@curong/types/isAggregateError', () => {
    test('测试1', () => {
        expect(isAggregateError(new Error())).toBe(false);
    });

    test('测试2', () => {
        const e = new AggregateError([new Error('some error')], 'Hello');
        expect(isAggregateError(e)).toBe(true);
        expect(e instanceof AggregateError).toBe(true);
        expect(e.message).toBe('Hello');
        expect(e.name).toBe('AggregateError');
    });
});
