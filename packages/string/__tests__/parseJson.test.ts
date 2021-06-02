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
});
