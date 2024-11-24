import { selectSync } from '..';

describe('@curong/function/selectSync', () => {
    test('测试1: condition 为 true，doIf 执行并返回正确结果', () => {
        const condition = () => true;
        const doIf = () => 'doIf executed';
        const doElse = () => 'doElse executed';

        expect(selectSync(condition, doIf, doElse)).toBe('doIf executed');
    });

    test('测试2: condition 为 true，doIf 为非函数，返回 doIf 的值', () => {
        const condition = () => true;
        const doIf = 'doIf executed';
        const doElse = 'doElse executed';

        expect(selectSync(condition, doIf, doElse)).toBe('doIf executed');
    });

    test('测试3: condition 为 true，doElse 不执行，返回 doIf 的值', () => {
        const condition = () => true;
        const doIf = 'doIf executed';
        const doElse = 'doElse executed';

        expect(selectSync(condition, doIf, doElse)).toBe('doIf executed');
    });

    test('测试4: condition 为 false，doElse 执行并返回正确结果', () => {
        const condition = () => false;
        const doIf = () => 'doIf executed';
        const doElse = () => 'doElse executed';

        expect(selectSync(condition, doIf, doElse)).toBe('doElse executed');
    });

    test('测试5: condition 为 false，doElse 为非函数，返回 doElse 的值', () => {
        const condition = () => false;
        const doIf = 'doIf executed';
        const doElse = 'doElse executed';

        expect(selectSync(condition, doIf, doElse)).toBe('doElse executed');
    });

    test('测试6: condition 为 false，doIf 和 doElse 都为 null，返回 null', () => {
        const condition = () => false;
        const doIf = null;
        const doElse = null;

        expect(selectSync(condition, doIf, doElse)).toBe(null);
    });

    test('测试7: condition 为 false，doIf 为 null，doElse 执行并返回正确结果', () => {
        const condition = () => false;
        const doIf = null;
        const doElse = () => 'doElse executed';

        expect(selectSync(condition, doIf, doElse)).toBe('doElse executed');
    });

    test('测试8: condition 为 true，doElse 为 null，不执行 doElse，返回 doIf 的值', () => {
        const condition = () => true;
        const doIf = () => 'doIf executed';
        const doElse = null;

        expect(selectSync(condition, doIf, doElse)).toBe('doIf executed');
    });

    test('测试9: condition 为布尔值 true，doIf 为非函数类型，返回 doIf 的值', () => {
        const condition = true;
        const doIf = 'doIf executed';
        const doElse = 'doElse executed';

        expect(selectSync(condition, doIf, doElse)).toBe('doIf executed');
    });

    test('测试10: condition 为布尔值 false，doElse 为非函数类型，返回 doElse 的值', () => {
        const condition = false;
        const doIf = 'doIf executed';
        const doElse = 'doElse executed';

        expect(selectSync(condition, doIf, doElse)).toBe('doElse executed');
    });

    test('测试11: condition 为函数，返回值为 true，doIf 执行', () => {
        const condition = () => true;
        const doIf = () => 'doIf executed';
        const doElse = () => 'doElse executed';

        expect(selectSync(condition, doIf, doElse)).toBe('doIf executed');
    });

    test('测试12: condition 为函数，返回值为 false，doElse 执行', () => {
        const condition = () => false;
        const doIf = () => 'doIf executed';
        const doElse = () => 'doElse executed';

        expect(selectSync(condition, doIf, doElse)).toBe('doElse executed');
    });
});
