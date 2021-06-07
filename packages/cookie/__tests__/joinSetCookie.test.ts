import { joinSetCookie } from '../src';

describe('@curong/cookie/joinSetCookie', () => {
    test('测试1', () => {
        const parsedCookie = {
            SNUID: {
                name: 'SNUID',
                value: 'CB4C700A7277B659D1A8F4FB73E8A03C',
                expires: new Date('2022-06-07T11:49:38.000Z'),
                domain: '.sogou.com',
                path: '/'
            },
            FUV: {
                name: 'FUV',
                value: '998fcca98f0de2afb3fcef727102dbf7',
                path: '/',
                expires: new Date('2022-06-07T11:49:38.000Z')
            }
        };

        // @ts-ignore
        const ret = joinSetCookie(parsedCookie);
        expect(ret).toBe(`SNUID=CB4C700A7277B659D1A8F4FB73E8A03C; FUV=998fcca98f0de2afb3fcef727102dbf7`)
    });
});
