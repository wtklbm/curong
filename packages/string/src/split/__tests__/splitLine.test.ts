import { splitLine } from '..';

describe('@curong/string/splitLine', () => {
    test('测试1', () => {
        expect(splitLine('')).toEqual(['']);
        expect(splitLine('xx')).toEqual(['xx']);
        expect(splitLine('x x')).toEqual(['x x']);
    });

    test('测试2', () => {
        expect(splitLine('x\rx')).toEqual(['x', 'x']);
        expect(splitLine('x\nx')).toEqual(['x', 'x']);
        expect(splitLine('x\r\nx')).toEqual(['x', 'x']);
    });

    test('测试3', () => {
        expect(splitLine('x\u000Bx')).toEqual(['x', 'x']);
        expect(splitLine('x\u000Cx')).toEqual(['x', 'x']);
        expect(splitLine('x\u0085x')).toEqual(['x', 'x']);
        expect(splitLine('x\u2028x')).toEqual(['x', 'x']);
        expect(splitLine('x\u2029x')).toEqual(['x', 'x']);
    });
});
