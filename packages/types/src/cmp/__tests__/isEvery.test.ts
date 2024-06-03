import { isNumber, isNumberHave, isNumberSafe } from '../..';

import { isEvery } from '..';

describe('@curong/types/isEvery', () => {
    test('测试1', () => {
        expect(isEvery(5, v => v > 0)).toBe(true);
        expect(isEvery(0, v => v > 0)).toBe(false);
        expect(isEvery([1, 2, 3], v => v > 0)).toBe(true);
        expect(isEvery([1, 2, -1], v => v > 0)).toBe(false);
        expect(isEvery(5, [v => v > 0, v => v < 10])).toBe(true);
        expect(isEvery(15, [v => v > 0, v => v < 10])).toBe(false);
        expect(isEvery([1, 2, 3], [v => v > 0, v => v < 4])).toBe(true);
        expect(isEvery([1, 2, 15], [v => v > 0, v => v < 10])).toBe(false);
    });

    test('测试2', () => {
        const v: any[] = [1];
        const fns: any[] = [isNumber, isNumberSafe, isNumberHave];
        expect(isEvery(1, fns)).toBeTruthy();
        expect(isEvery(1, isNumber)).toBeTruthy();
        expect(isEvery(v, fns)).toBeTruthy();
        expect(isEvery(v, isNumberSafe)).toBeTruthy();

        v.push(2);
        expect(isEvery(v, fns)).toBeTruthy();

        v.push('12');
        expect(isEvery(v, fns)).toBeFalsy();
        v.pop();

        fns.push((v: any) => typeof v === 'string');
        expect(isEvery(v, fns)).toBeFalsy();
    });
});
