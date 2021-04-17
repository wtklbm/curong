import { mapReplace } from '../src';

describe('@curong/regexp/mapReplace', () => {
    test('测试1', () => {
        const regexps = [/b/g, /a/g];
        expect(mapReplace(regexps, 'Aa', 'x')).toBe('Ax');
        expect(mapReplace(regexps, 'ab', 'x')).toBe('xx');
    });

    test('测试2', () => {
        const regexps = [/b/g, /a/g];
        expect(mapReplace(regexps, 'Aa', v => v + 'x')).toBe('Aax');
        expect(mapReplace(regexps, 'ab', v => v + 'x')).toBe('axbx');
    });
});
