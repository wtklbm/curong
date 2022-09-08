import { toSentences } from '../src';

describe('toSentences', () => {
    test('测试1', () => {
        const v = `this is a test. my name is \`wtklbm\`.`;

        expect(toSentences(v)).toEqual([
            'this is a test.',
            'my name is `wtklbm`.'
        ]);
    });

    test('测试2', () => {
        let v = `this is a test. (b. value) my name is \`wtklbm\`.`;

        expect(toSentences(v)).toEqual([
            'this is a test.',
            '(b. value) my name is `wtklbm`.'
        ]);

        v = `this is a test. (b. value)`;

        expect(toSentences(v)).toEqual(['this is a test.', '(b. value)']);

        v = `(b. value)`;

        expect(toSentences(v)).toEqual(['(b. value)']);
    });

    test('测试3', () => {
        const v = `this is a test. the e.g. my name is \`wtklbm\`.`;

        expect(toSentences(v)).toEqual([
            'this is a test.',
            'the e.g. my name is `wtklbm`.'
        ]);
    });

    test('测试4', () => {
        let v = `this is a test. (value test. yes)`;

        expect(toSentences(v)).toEqual([
            'this is a test.',
            '(value test. yes)'
        ]);

        v = `this is a test. (value test? yes)`;

        expect(toSentences(v)).toEqual([
            'this is a test.',
            '(value test? yes)'
        ]);

        v = `this is a test. (value (test)? yes)`;

        expect(toSentences(v)).toEqual([
            'this is a test.',
            '(value (test)? yes)'
        ]);
    });

    test('测试5', () => {
        let v = `this is (value (test. xxx\\). yes. xx).`;

        expect(toSentences(v)).toEqual([
            `this is (value (test. xxx\\). yes. xx).`
        ]);

        v = `this is 'value 'test. xxx'. yes. xx'.`;

        expect(toSentences(v)).toEqual([
            `this is 'value 'test. xxx'. yes. xx'.`
        ]);
    });

    test('测试6', () => {
        let v = `th's test. and 'tet\\'s' value.`;

        expect(toSentences(v, { escape: true })).toEqual([
            `th's test.`,
            `and 'tet\\'s' value.`
        ]);

        expect(toSentences(v)).toEqual([`th's test.`, `and 'tet\\'s' value.`]);
    });

    test('测试7', () => {
        let v = `this is a test. my name is ['li ming'`;

        expect(toSentences(v)).toEqual([
            `this is a test.`,
            `my name is ['li ming'`
        ]);
    });

    test('测试8', () => {
        let v = `This will print \`Cons(1, Cons(2, Nil))\`.`;

        expect(toSentences(v)).toEqual([
            `This will print \`Cons(1, Cons(2, Nil))\`.`
        ]);
    });

    test('测试9', () => {
        let v =
            'Insert a named `value` (+/- `noise`) metric into the map. The value must be non-negative. The `noise` indicates the uncertainty of the metric, which doubles as the "noise range" of acceptable pairwise-regressions on this named value, when comparing from one metric to the next using `compare_to_old`.';

        expect(toSentences(v)).toEqual([
            'Insert a named `value` (+/- `noise`) metric into the map.',
            'The value must be non-negative.',
            'The `noise` indicates the uncertainty of the metric, which doubles as the "noise range" of acceptable pairwise-regressions on this named value, when comparing from one metric to the next using `compare_to_old`.'
        ]);
    });

    test('测试10', () => {
        let v =
            'In particular, casting any aligned non-zero integer literal to a raw pointer produces a valid pointer, but a pointer pointing into previously allocated memory that since got freed is not valid. The recommended way to build a Box to a ZST if `Box::new` cannot be used is to use [`ptr::NonNull::dangling`].';

        expect(toSentences(v)).toEqual([
            'In particular, casting any aligned non-zero integer literal to a raw pointer produces a valid pointer, but a pointer pointing into previously allocated memory that since got freed is not valid.',
            'The recommended way to build a Box to a ZST if `Box::new` cannot be used is to use [`ptr::NonNull::dangling`].'
        ]);
    });

    test('测试11', () => {
        let v =
            'If a condition mask bit is zero, the corresponding multiplication is replaced by a value of `0.0`. If a broadcast mask bit is one, the result of the dot product will be stored in the return value component. Otherwise if the broadcast mask bit is zero then the return component will be zero.';

        expect(toSentences(v)).toEqual([
            'If a condition mask bit is zero, the corresponding multiplication is replaced by a value of `0.0`.',
            'If a broadcast mask bit is one, the result of the dot product will be stored in the return value component.',
            'Otherwise if the broadcast mask bit is zero then the return component will be zero.'
        ]);
    });

    test('测试11', () => {
        let v = 'this is a :: and very match.';

        expect(toSentences(v)).toEqual(['this is a :: and very match.']);
    });

    test('测试12', () => {
        const o = { ellipsis: false };
        let v = 'this is a any, and more... and very more...... and good.';

        expect(toSentences(v, o)).toEqual([
            'this is a any, and more... and very more...... and good.'
        ]);

        v = '这里。。。有很多人。。。很多人。。。';

        expect(toSentences(v, o)).toEqual([
            '这里。。。有很多人。。。很多人。。。'
        ]);

        v = '这里... 有很多人... 很多人...';

        expect(toSentences(v, o)).toEqual(['这里... 有很多人... 很多人...']);
    });

    test('测试13', () => {
        const v =
            'This is only used to make thread locals with `const { .. }` initialization expressions unstable. If and/or when that syntax is stabilized with thread locals this will simply be removed.';

        expect(toSentences(v)).toEqual([
            'This is only used to make thread locals with `const { .. }` initialization expressions unstable.',
            'If and/or when that syntax is stabilized with thread locals this will simply be removed.'
        ]);
    });

    test('测试14', () => {
        const v = '我爱中国，中国强大。非常强大！';

        expect(toSentences(v)).toEqual(['我爱中国，中国强大。', '非常强大！']);
    });

    test('测试15', () => {
        const v =
            '[`thread`](https://doc.rust-lang.org/nightly/std/thread/index.html) 模块包含了 Rust 的线程抽象。[`sync`](https://doc.rust-lang.org/nightly/std/sync/index.html) 包含更多的原始共享内存类型，包括 [`atomic`] 和 [`mpsc`]，其中包含用于消息传递的通道类型。';

        expect(toSentences(v)).toEqual([
            '[`thread`](https://doc.rust-lang.org/nightly/std/thread/index.html) 模块包含了 Rust 的线程抽象。',
            '[`sync`](https://doc.rust-lang.org/nightly/std/sync/index.html) 包含更多的原始共享内存类型，包括 [`atomic`] 和 [`mpsc`]，其中包含用于消息传递的通道类型。'
        ]);
    });

    test('测试16', () => {
        const v = '1. 测试序号。';

        expect(toSentences(v)).toEqual(['1. 测试序号。']);
    });

    test('测试17', () => {
        const v = '测试序号。1.';

        expect(toSentences(v)).toEqual(['测试序号。', '1.']);
    });
});
