import { isUUID } from '..';

describe('@curong/regexp/isUUID', () => {
    test('测试1', () => {
        expect(isUUID('')).toBe(false);
        expect(isUUID('undefined')).toBe(false);
        expect(isUUID('null')).toBe(false);
        expect(isUUID('123')).toBe(false);
        expect(isUUID('/regex/')).toBe(false);
        expect(isUUID('false')).toBe(false);
        expect(isUUID('this-is-not-a-uuid')).toBe(false);
        expect(isUUID('invalid uuid string')).toBe(false);
        expect(isUUID('123e4567-e89b-12d3-a456-42661417400Z')).toBe(false);
        expect(isUUID('=Y00a-f*vb*-c-d0k-l---00n-fg000-00p-00r+')).toBe(false);
    });

    test('测试2', () => {
        expect(isUUID('123e4567-e89b-12d3-a456-426614174000')).toBe(true);
        expect(isUUID('00000000-0000-1000-8000-000000000000')).toBe(true);
        expect(isUUID('ffffffff-ffff-1fff-8fff-ffffffffffff')).toBe(true);
        expect(isUUID('00000000-0000-2000-8000-000000000000')).toBe(true);
        expect(isUUID('ffffffff-ffff-2fff-bfff-ffffffffffff')).toBe(true);
        expect(isUUID('00000000-0000-3000-8000-000000000000')).toBe(true);
        expect(isUUID('ffffffff-ffff-3fff-bfff-ffffffffffff')).toBe(true);
        expect(isUUID('00000000-0000-4000-8000-000000000000')).toBe(true);
        expect(isUUID('ffffffff-ffff-4fff-bfff-ffffffffffff')).toBe(true);
        expect(isUUID('00000000-0000-5000-8000-000000000000')).toBe(true);
        expect(isUUID('ffffffff-ffff-5fff-bfff-ffffffffffff')).toBe(true);
        expect(isUUID('00000000-0000-6000-8000-000000000000')).toBe(true);
        expect(isUUID('ffffffff-ffff-6fff-bfff-ffffffffffff')).toBe(true);
        expect(isUUID('00000000-0000-7000-8000-000000000000')).toBe(true);
        expect(isUUID('ffffffff-ffff-7fff-bfff-ffffffffffff')).toBe(true);
        expect(isUUID('00000000-0000-8000-8000-000000000000')).toBe(true);
        expect(isUUID('ffffffff-ffff-8fff-bfff-ffffffffffff')).toBe(true);
        expect(isUUID('00000000-0000-9000-8000-000000000000')).toBe(false);
        expect(isUUID('ffffffff-ffff-9fff-bfff-ffffffffffff')).toBe(false);
        expect(isUUID('00000000-0000-a000-8000-000000000000')).toBe(false);
        expect(isUUID('ffffffff-ffff-afff-bfff-ffffffffffff')).toBe(false);
        expect(isUUID('00000000-0000-b000-8000-000000000000')).toBe(false);
        expect(isUUID('ffffffff-ffff-bfff-bfff-ffffffffffff')).toBe(false);
        expect(isUUID('00000000-0000-c000-8000-000000000000')).toBe(false);
        expect(isUUID('ffffffff-ffff-cfff-bfff-ffffffffffff')).toBe(false);
        expect(isUUID('00000000-0000-d000-8000-000000000000')).toBe(false);
        expect(isUUID('ffffffff-ffff-dfff-bfff-ffffffffffff')).toBe(false);
        expect(isUUID('00000000-0000-e000-8000-000000000000')).toBe(false);
        expect(isUUID('ffffffff-ffff-efff-bfff-ffffffffffff')).toBe(false);
        expect(isUUID('d9428888-122b-11e1-b85c-61cd3cbb3210')).toBe(true);
        expect(isUUID('000003e8-2363-21ef-b200-325096b39f47')).toBe(true);
        expect(isUUID('a981a0c2-68b1-35dc-bcfc-296e52ab01ec')).toBe(true);
        expect(isUUID('109156be-c4fb-41ea-b1b4-efe1671c5836')).toBe(true);
        expect(isUUID('90123e1c-7512-523e-bb28-76fab9f2f73d')).toBe(true);
        expect(isUUID('1ef21d2f-1207-6660-8c4f-419efbd44d48')).toBe(true);
        expect(isUUID('017f22e2-79b0-7cc3-98c4-dc0c0c07398f')).toBe(true);
        expect(isUUID('0d8f23a0-697f-83ae-802e-48f3756dd581')).toBe(true);
        expect(isUUID('00000000-0000-1000-0000-000000000000')).toBe(false);
        expect(isUUID('00000000-0000-1000-1000-000000000000')).toBe(false);
        expect(isUUID('00000000-0000-1000-2000-000000000000')).toBe(false);
        expect(isUUID('00000000-0000-1000-3000-000000000000')).toBe(false);
        expect(isUUID('00000000-0000-1000-4000-000000000000')).toBe(false);
        expect(isUUID('00000000-0000-1000-5000-000000000000')).toBe(false);
        expect(isUUID('00000000-0000-1000-6000-000000000000')).toBe(false);
        expect(isUUID('00000000-0000-1000-7000-000000000000')).toBe(false);
        expect(isUUID('00000000-0000-1000-8000-000000000000')).toBe(true);
        expect(isUUID('00000000-0000-1000-9000-000000000000')).toBe(true);
        expect(isUUID('00000000-0000-1000-a000-000000000000')).toBe(true);
        expect(isUUID('00000000-0000-1000-b000-000000000000')).toBe(true);
        expect(isUUID('00000000-0000-1000-c000-000000000000')).toBe(false);
        expect(isUUID('00000000-0000-1000-d000-000000000000')).toBe(false);
        expect(isUUID('00000000-0000-1000-e000-000000000000')).toBe(false);
        expect(isUUID('00000000-0000-1000-f000-000000000000')).toBe(false);
        expect(isUUID('00000000000000000000000000000000')).toBe(false);
    });
});