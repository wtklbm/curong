import { splitSetCookie } from '../src';

describe('@curong/cookie/splitSetCookie', () => {
    test('测试1', () => {
        const v = [
            'SNUID=CB4C700A7277B659D1A8F4FB73E8A03C; expires=Tue, 07-Jun-22 11:49:38 GMT; domain=.sogou.com; path=/',
            'FUV=998fcca98f0de2afb3fcef727102dbf7; path=/; expires=Tue, 07 Jun 2022 11:49:38 GMT'
        ];

        expect(splitSetCookie(v.join(','))).toEqual(v);
    });
});
