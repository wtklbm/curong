import { random } from '../src';

describe('@curong/string/random', () => {
    test('测试1', () => {
        expect(random()?.length).toBe(15);
    });
});
