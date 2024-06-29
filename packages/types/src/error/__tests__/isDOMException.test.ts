import { isDOMException } from '..';

describe('@curong/types/isDOMException', () => {
    test('测试1', () => {
        expect(isDOMException(null)).toBe(false);
        expect(isDOMException(undefined)).toBe(false);
        expect(isDOMException(new Error())).toBe(false);
        expect(isDOMException(new TypeError())).toBe(false);
        expect(isDOMException(new SyntaxError())).toBe(false);
        expect(isDOMException(new EvalError())).toBe(false);
        expect(isDOMException(new ReferenceError())).toBe(false);
        expect(isDOMException(new RangeError())).toBe(false);
    });

    test('测试2', () => {
        expect(isDOMException(new DOMException())).toBe(true);

        expect(isDOMException(new DOMException('Test DOMException'))).toBe(
            true
        );

        expect(
            isDOMException(
                new DOMException('Test DOMException'),
                'UnknownError'
            )
        ).toBe(false);

        expect(
            isDOMException(
                new DOMException('Test DOMException', 'UnknownError')
            )
        ).toBe(true);

        expect(
            isDOMException(
                new DOMException('Test DOMException', 'UnknownError'),
                'UnknownError'
            )
        ).toBe(true);
    });
});
