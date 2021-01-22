import { ansiFormat } from '../src';

describe('@curong/term/ansiFormat', () => {
    test('测试1', () => {
        expect(ansiFormat()).toEqual({
            set: '',
            reset: ''
        });

        expect(ansiFormat({})).toEqual({
            set: '',
            reset: ''
        });
    });

    test('测试2', () => {
        let ret = ansiFormat({
            bold: true,
            italic: true,
            blink: true,
            reverse: true
        });

        expect(ret).toEqual({
            set: '1;3;5;7',
            reset: '22;23;25;27'
        });
    });

    test('测试3', () => {
        let ret = ansiFormat({
            bold: true,
            italic: true,
            blink: false,
            reverse: false
        });

        expect(ret).toEqual({
            set: '1;3',
            reset: '22;23;25;27'
        });
    });
});
