import { parseJson } from '..';

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
        const data = await parseJson('{"__proto__":"xxx"}');
        expect(Object.keys(data!)).toEqual(['__proto__']);
        // @ts-ignore
        expect(data.__proto__).toBe('xxx');
        expect(Object.getPrototypeOf(data)).toBe(Object.prototype);
        expect(Object.getPrototypeOf(data).constructor).toBe(Object);
    });

    test('测试5', async () => {
        const data = await parseJson('{"constructor":"xxx"}');
        expect(Object.keys(data!)).toEqual(['constructor']);
        // @ts-ignore
        expect(data.constructor).toBe('xxx');
        expect(Object.getPrototypeOf(data)).toBe(Object.prototype);
        expect(Object.getPrototypeOf(data).constructor).toBe(Object);
    });
});
