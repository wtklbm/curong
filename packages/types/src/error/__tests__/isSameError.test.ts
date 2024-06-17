import { isSameError } from '..';

describe('@curong/types/isSameError', () => {
    test('测试1', () => {
        expect(isSameError(new Set(), '', '')).toBeFalsy();
        expect(isSameError(null, '', '')).toBeFalsy();
        expect(isSameError(undefined, '', '')).toBeFalsy();
        expect(isSameError(new Error('test'), 'Error', '')).toBeFalsy();
        expect(isSameError(new EvalError('test'), 'Error', 'test')).toBeFalsy();
    });

    test('测试2', () => {
        let e;

        e = new Error('Error value');
        expect(isSameError(e, 'Error', 'Error value')).toBeTruthy();

        e = new EvalError('EvalError value');
        expect(isSameError(e, 'EvalError', 'EvalError value')).toBeTruthy();

        e = new RangeError('RangeError value');
        expect(isSameError(e, 'RangeError', 'RangeError value')).toBeTruthy();

        e = new ReferenceError('ReferenceError value');
        expect(
            isSameError(e, 'ReferenceError', 'ReferenceError value')
        ).toBeTruthy();

        e = new SyntaxError('SyntaxError value');
        expect(isSameError(e, 'SyntaxError', 'SyntaxError value')).toBeTruthy();

        e = new TypeError('TypeError value');
        expect(isSameError(e, 'TypeError', 'TypeError value')).toBeTruthy();
    });
});
