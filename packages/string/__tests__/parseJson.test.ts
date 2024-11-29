import { parseJson } from '../src';

describe('@curong/string/parseJson', () => {
    test('测试1', () => {
        const s = '{value:"",number:0,bool:false}';
        parseJson(s).catch(e => {
            expect(e).toBeTruthy();
        });
    });

    test('测试2', async () => {
        const s = '{"value":"","number":0,"bool":false}';
        const ret = await parseJson(s);
        expect(ret).toEqual({ value: '', number: 0, bool: false });
    });

    test('测试3', async () => {
        const s = '{"value":"","number":0,"bool":false}';
        const ret = await parseJson(s, (k, v) => v);
        expect(ret).toEqual({ value: '', number: 0, bool: false });
    });

    test('测试4', async () => {
        expect(parseJson('{"__proto__":""}')).rejects.toThrow();
        expect(parseJson('{"constructor":""}')).rejects.toThrow();
    });
});
