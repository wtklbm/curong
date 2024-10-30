import { ascii } from '..';

describe('@curong/regexp/ascii', () => {
    test('测试1', () => {
        const r = new RegExp(ascii);
        const s: string[] = ['\u0000', '\u007F'];
        expect(s.every(v => r.test(v))).toBe(true);
    });
});
