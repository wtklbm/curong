import { bytesLength } from '..';

describe('@curong/string/bytesLength', () => {
    test('测试1', () => {
        expect(bytesLength('')).toBe(Buffer.from('').length);
        expect(bytesLength('😀')).toBe(Buffer.from('😀').length);
        expect(bytesLength('123')).toBe(Buffer.from('123').length);
        expect(bytesLength('我爱你!')).toBe(Buffer.from('我爱你!').length);
        expect(bytesLength('i love you!')).toBe(
            Buffer.from('i love you!').length
        );
        expect(bytesLength('我a@v1壹IIIアΔДǎ┅X十')).toBe(
            Buffer.from('我a@v1壹IIIアΔДǎ┅X十').length
        );
    });
});
