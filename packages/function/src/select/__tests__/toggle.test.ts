import toggle from '../toggle';

describe('@curong/function/position', () => {
    let position: any;

    beforeEach(() => {
        position = toggle('left', 'right');
    });

    test('测试1', () => {
        expect(position.value).toBe('left');
    });

    test('测试2', () => {
        expect(position.toggle()).toBe('right');
        expect(position.value).toBe('right');
        expect(position.toggle()).toBe('left');
        expect(position.value).toBe('left');
    });

    test('测试3', () => {
        expect(position.toggle()).toBe('right');
        position.setLeft();
        expect(position.value).toBe('left');
    });

    test('测试4', () => {
        position.setRight();
        expect(position.value).toBe('right');
    });

    test('测试5', () => {
        expect(position.toggle()).toBe('right');
        expect(position.toggle()).toBe('left');
        expect(position.toggle()).toBe('right');
        expect(position.value).toBe('right');
    });

    test('测试6', () => {
        position.setRight();
        position.setLeft();
        position.setRight();
        position.setLeft();
        expect(position.value).toBe('left');
    });
});
