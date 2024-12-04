// @ts-nocheck

import { toJsonString } from '..';

describe('@curong/string/toJsonString', () => {
    test('测试1', () => {
        const s = { title: '标题' };
        s.content = s;

        toJsonString(s, { cycles: false }).catch(e => {
            expect(e).toBeDefined();
        });

        toJsonString(BigInt(0n)).catch(e => {
            expect(e).toBeDefined();
        });
    });

    test('测试2', async () => {
        const s = { value: '', number: 0, bool: false };
        const ret = await toJsonString(s);
        expect(ret).toBe('{"value":"","number":0,"bool":false}');
    });

    test('测试3', async () => {
        const fixture = {
            a: true,
            b: {
                c: 1
            }
        };

        expect(await toJsonString(fixture, { space: '\t' })).toEqual(
            JSON.stringify(fixture, undefined, '\t')
        );
    });

    test('测试4', async () => {
        const fixture = {
            a: true
        };

        fixture.b = fixture;

        fixture.c = [fixture, fixture.b];

        fixture.d = {
            e: fixture.c
        };

        expect(await toJsonString(fixture)).toEqual(
            '{"a":true,"b":"[Circular *]","c":["[Circular *]","[Circular *]"],"d":{"e":["[Circular *]","[Circular *]"]}}'
        );
    });

    test('测试5', async () => {
        const fixture2 = {
            c: true
        };

        const fixture = {
            a: fixture2,
            b: fixture2
        };

        expect(await toJsonString(fixture)).toEqual(
            '{"a":{"c":true},"b":{"c":true}}'
        );
    });

    test('测试6', async () => {
        const fixture = [1];

        fixture.push(fixture, fixture);

        expect(await toJsonString(fixture)).toEqual(
            '[1,"[Circular *]","[Circular *]"]'
        );
    });

    test('测试7', async () => {
        const fixture = {
            a: true
        };

        fixture.b = fixture;

        expect(await toJsonString([fixture, fixture])).toEqual(
            '[{"a":true,"b":"[Circular *0]"},{"a":true,"b":"[Circular *1]"}]'
        );
    });

    test('测试8', async () => {
        const fixture = {
            a: true
        };

        fixture.b = fixture;

        expect(await toJsonString({ x: fixture, y: fixture })).toEqual(
            '{"x":{"a":true,"b":"[Circular *x]"},"y":{"a":true,"b":"[Circular *y]"}}'
        );
    });

    test('测试9', async () => {
        const fixture = {
            a: {
                b: {
                    c: {
                        d: 1
                    }
                }
            }
        };

        expect(await toJsonString(fixture)).toEqual(JSON.stringify(fixture));
    });

    test('测试10', async () => {
        const fixture = {
            a: {
                b: {
                    c: {}
                }
            }
        };

        fixture.a.b.c.d = fixture.a;

        expect(await toJsonString(fixture)).toEqual(
            '{"a":{"b":{"c":{"d":"[Circular *a]"}}}}'
        );
    });

    test('测试11', async () => {
        const shared = { x: 1 };
        const circular = { y: 2 };
        circular.self = circular;

        const fixture = {
            a: shared,
            b: {
                c: shared,
                d: circular
            },
            e: circular
        };

        expect(await toJsonString(fixture)).toEqual(
            '{"a":{"x":1},"b":{"c":{"x":1},"d":{"y":2,"self":"[Circular *b.d]"}},"e":{"y":2,"self":"[Circular *e]"}}'
        );
    });

    test('测试12', async () => {
        const fixture = {
            a: {
                b: {
                    c: {}
                }
            }
        };

        fixture.a.b.c.d = fixture.a;
        fixture.a.b.c.e = fixture.a.b;

        expect(await toJsonString(fixture)).toEqual(
            '{"a":{"b":{"c":{"d":"[Circular *a]","e":"[Circular *a.b]"}}}}'
        );
    });

    test('测试13', async () => {
        const fixture = {
            a: 1,
            b: 2
        };

        fixture.self = fixture;

        expect(await toJsonString(fixture)).toEqual(
            '{"a":1,"b":2,"self":"[Circular *]"}'
        );
    });

    test('测试14', async () => {
        const fixture = {};

        expect(await toJsonString(fixture)).toEqual(JSON.stringify(fixture));
    });

    test('测试15', async () => {
        const fixture = {
            a: null
        };

        expect(await toJsonString(fixture)).toEqual(JSON.stringify(fixture));
    });

    test('测试16', async () => {
        const fixture = {
            a: undefined
        };

        expect(await toJsonString(fixture)).toEqual(JSON.stringify(fixture));
    });

    test('测试17', async () => {
        const fixture = {
            a: {
                b: {
                    c: {}
                }
            }
        };

        fixture.a.b.c.d = fixture.a;
        fixture.a.b.c.e = fixture.a.b;
        fixture.a.b.c.f = fixture.a.b.c;

        expect(await toJsonString(fixture)).toEqual(
            '{"a":{"b":{"c":{"d":"[Circular *a]","e":"[Circular *a.b]","f":"[Circular *a.b.c]"}}}}'
        );
    });

    test('测试18', async () => {
        const fixture = [[1, 2, 3]];

        fixture.push(fixture, [fixture, fixture]);

        expect(await toJsonString(fixture)).toEqual(
            '[[1,2,3],"[Circular *]",["[Circular *]","[Circular *]"]]'
        );
    });

    test('测试19', async () => {
        const fixture = {
            a: {
                b: {
                    c: {}
                }
            }
        };

        fixture.a.b.c.parent = fixture.a.b;
        fixture.a.b.c.grandparent = fixture.a;

        expect(await toJsonString(fixture)).toEqual(
            '{"a":{"b":{"c":{"parent":"[Circular *a.b]","grandparent":"[Circular *a]"}}}}'
        );
    });

    test('测试20', async () => {
        const circular = { a: 1 };
        circular.self = circular;

        const fixture = [
            { b: 2, c: circular },
            { d: 3, e: circular }
        ];

        expect(await toJsonString(fixture)).toEqual(
            '[{"b":2,"c":{"a":1,"self":"[Circular *0.c]"}},{"d":3,"e":{"a":1,"self":"[Circular *1.e]"}}]'
        );
    });

    test('测试21', async () => {
        const fixture = {
            date: new Date('2024-06-12T16:06:46.442Z')
        };

        expect(await toJsonString(fixture)).toEqual(JSON.stringify(fixture));
    });

    test('测试22', async () => {
        const fixture = {
            a: 1,
            toJSON() {
                return { b: 2 };
            }
        };

        expect(await toJsonString(fixture)).toEqual(JSON.stringify(fixture));
    });

    test('测试23', async () => {
        const fixture = {
            date: new Date('2024-06-12T16:06:46.442Z'),
            nested: {
                toJSON() {
                    return { b: 2 };
                }
            }
        };

        expect(await toJsonString(fixture)).toEqual(JSON.stringify(fixture));
    });

    test('测试24', async () => {
        const fixture = {
            date: new Date('2024-06-12T16:06:46.442Z')
        };

        fixture.self = fixture;

        const expected = JSON.stringify({
            date: '2024-06-12T16:06:46.442Z',
            self: '[Circular *]'
        });
        expect(await toJsonString(fixture)).toEqual(expected);
    });

    test('测试25', async () => {
        const fixture = {
            a: {
                toJSON() {
                    return { b: 2 };
                }
            },
            b: {
                toJSON() {
                    return { c: 3 };
                }
            }
        };

        expect(await toJsonString(fixture)).toEqual(JSON.stringify(fixture));
    });

    test('测试26', async () => {
        const fixture = {
            a: 1,
            toJSON() {
                const x = { b: 2 };
                x.self = x;
                return x;
            }
        };

        const expected = JSON.stringify({ b: 2, self: '[Circular *]' });
        expect(await toJsonString(fixture)).toEqual(expected);
    });

    test('测试27', async () => {
        const fixture = [
            {
                toJSON() {
                    return { a: 1 };
                }
            },
            {
                toJSON() {
                    return { b: 2 };
                }
            }
        ];

        expect(await toJsonString(fixture)).toEqual(JSON.stringify(fixture));
    });

    test('测试28', async () => {
        const fixture = [
            new Date('2024-06-12T16:06:46.442Z'),
            {
                toJSON() {
                    return { b: 2 };
                }
            }
        ];

        expect(await toJsonString(fixture)).toEqual(JSON.stringify(fixture));
    });

    test('测试29', async () => {
        const shared = {
            x: 1,
            toJSON() {
                return {
                    x: this.x
                };
            }
        };

        const circular = {
            y: 2,
            toJSON() {
                return {
                    y: this.y,
                    self: '[Circular]'
                };
            }
        };

        circular.self = circular;

        const fixture = {
            a: shared,
            b: {
                c: shared,
                d: circular
            },
            e: circular
        };

        const expected = JSON.stringify({
            a: {
                x: 1
            },
            b: {
                c: {
                    x: 1
                },
                d: {
                    y: 2,
                    self: '[Circular]'
                }
            },
            e: {
                y: 2,
                self: '[Circular]'
            }
        });

        expect(await toJsonString(fixture)).toEqual(expected);

        expect(
            await toJsonString(fixture, {
                replacer: ['a', 'x', 'e', 'y']
            })
        ).toEqual('{"a":{"x":1},"e":{"y":2}}');

        expect(
            await toJsonString(fixture, {
                replacer(k, v) {
                    if (['a', 'c', 'y'].includes(k)) {
                        return undefined;
                    }

                    return v;
                }
            })
        ).toEqual(
            '{"b":{"d":{"self":"[Circular]"}},"e":{"self":"[Circular]"}}'
        );

        expect(
            await toJsonString(fixture, {
                replacer(k, v) {
                    if (typeof v === 'number') {
                        return undefined;
                    }

                    return v;
                }
            })
        ).toEqual(
            '{"a":{},"b":{"c":{},"d":{"self":"[Circular]"}},"e":{"self":"[Circular]"}}'
        );
    });

    test('测试30', async () => {
        const obj = { c: 8, b: [{ z: 6, y: 5, x: 4 }, 7], a: 3 };
        const objSerializer = await toJsonString(obj, {
            compare(a, b) {
                return a.key < b.key ? 1 : -1;
            }
        });

        expect(objSerializer).toBe('{"c":8,"b":[{"z":6,"y":5,"x":4},7],"a":3}');
    });

    test('测试31', async () => {
        const obj = { d: 6, c: 5, b: [{ z: 3, y: 2, x: 1 }, 9], a: 10 };
        const objSerializer = await toJsonString(obj, {
            compare(a, b) {
                return a.value < b.value ? 1 : -1;
            }
        });

        expect(objSerializer).toBe(
            '{"a":10,"b":[{"z":3,"y":2,"x":1},9],"d":6,"c":5}'
        );
    });

    test('测试32', async () => {
        const obj = { c: 8, b: [{ z: 6, y: 5, x: 4 }, 7], a: 3 };

        expect(await toJsonString(obj)).toBe(
            '{"c":8,"b":[{"z":6,"y":5,"x":4},7],"a":3}'
        );
        expect(
            await toJsonString(obj, {
                compare(a, b) {
                    return a.key - b.key ? 1 : -1;
                }
            })
        ).toBe('{"a":3,"b":[{"x":4,"y":5,"z":6},7],"c":8}');
    });
});
