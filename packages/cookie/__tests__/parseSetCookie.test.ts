import { parseSetCookie } from '../src';

describe('@curong/cookie/parseSetCookie', () => {
    test('测试1', () => {
        const v = [
            'SNUID=CB4C700A7277B659D1A8F4FB73E8A03C; expires=Tue, 07-Jun-22 11:49:38 GMT; domain=.sogou.com; path=/',
            'FUV=998fcca98f0de2afb3fcef727102dbf7; path=/; expires=Tue, 07 Jun 2022 11:49:38 GMT'
        ];

        const ret = parseSetCookie(v);

        expect(ret).toEqual([
            {
                name: 'SNUID',
                value: 'CB4C700A7277B659D1A8F4FB73E8A03C',
                expires: new Date('2022-06-07T11:49:38.000Z'),
                domain: '.sogou.com',
                path: '/'
            },
            {
                name: 'FUV',
                value: '998fcca98f0de2afb3fcef727102dbf7',
                path: '/',
                expires: new Date('2022-06-07T11:49:38.000Z')
            }
        ]);
    });

    test('测试2', () => {
        const v = [
            'SNUID=CB4C700A7277B659D1A8F4FB73E8A03C; expires=Tue, 07-Jun-22 11:49:38 GMT; domain=.sogou.com; path=/',
            'FUV=998fcca98f0de2afb3fcef727102dbf7; path=/; expires=Tue, 07 Jun 2022 11:49:38 GMT'
        ];

        const ret = parseSetCookie(v, { map: true });

        expect(ret).toEqual({
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
        });
    });
});
