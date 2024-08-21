import { startSpacesLength } from '..';

describe('@curong/string/startSpacesLength', () => {
    test('测试1', () => {
        expect(startSpacesLength('+')).toBe(0);
        expect(startSpacesLength(' +')).toBe(1);
    });
});
