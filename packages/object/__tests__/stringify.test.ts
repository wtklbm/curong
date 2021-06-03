import { stringify } from '../src';

describe('@curong/string/stringify', () => {
    test('测试1', () => {
        const s = { title: '标题' };
        // @ts-ignore
        s.content = s;

        stringify(s).catch(e => {
            expect(e).toBeTruthy();
        });
    });

    test('测试2', async () => {
        const s = { value: '', number: 0, bool: false };
        const ret = await stringify(s);
        expect(ret).toBe('{"value":"","number":0,"bool":false}');
    });
});
