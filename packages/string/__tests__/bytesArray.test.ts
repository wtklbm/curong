import { bytesArray } from '../src';

describe('@curong/string/bytesArray', () => {
    test('测试1', () => {
        expect(bytesArray('')).toEqual([...Buffer.from('')]);
        expect(bytesArray('123')).toEqual([...Buffer.from('123')]);
        expect(bytesArray('我爱你!')).toEqual([...Buffer.from('我爱你!')]);
        expect(bytesArray('i love you!')).toEqual([
            ...Buffer.from('i love you!')
        ]);
        expect(bytesArray('我a@v1壹IIIアΔДǎ┅X十')).toEqual([
            ...Buffer.from('我a@v1壹IIIアΔДǎ┅X十')
        ]);
    });
});
