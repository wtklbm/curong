import { cancelExec } from '../src';

const fn = (a: number, b: string, bool: boolean) => {
    return new Promise(resolve => {
        let timer: any = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            resolve(a + +b * 2 - +bool);
        }, 50);
    });
};

describe('@curong/function/cancelExec', () => {
    test('测试1', () => {
        const [promise, abort] = cancelExec(fn, 1, '2', false);

        promise.then(
            data => {
                expect(data).toBe('超过 2s 了');
            },
            err => {
                expect(err).toBe(undefined);
            }
        );

        setTimeout(() => {
            abort('超过 2s 了');
        }, 10);
    });

    test('测试2', () => {
        const [promise, abort] = cancelExec(fn, 1, '2', false);

        promise.then(
            data => {
                expect(data).toBe(undefined);
            },
            err => {
                expect(err).toBe('超过 2s 了');
            }
        );

        setTimeout(() => {
            abort(Promise.reject('超过 2s 了'));
        }, 10);
    });

    test('测试3', () => {
        const [promise, abort] = cancelExec(fn, 1, '2', false);

        promise.then(
            data => {
                expect(data).toBe(undefined);
            },
            err => {
                expect(err).toBe(undefined);
            }
        );

        setTimeout(() => {
            abort();
        }, 10);
    });

    test('测试4', () => {
        const [promise, abort] = cancelExec(() => fn(1, '2', false));

        promise.then(
            data => {
                expect(data).toBe(undefined);
            },
            err => {
                expect(err).toBe(undefined);
            }
        );

        setTimeout(() => {
            abort();
        }, 10);
    });

    test('测试5', () => {
        const [promise, abort] = cancelExec(fn, 1, '2', false);

        promise.then(
            data => {
                expect(data).toBe(5);
            },
            err => {
                expect(err).toBe(undefined);
            }
        );

        setTimeout(() => {
            abort('超过 2s 了');
        }, 60);
    });

    test('测试5', () => {
        const [promise, abort] = cancelExec(fn, 1, '2', false);

        promise.then(
            data => {
                expect(data).toBe(5);
            },
            err => {
                expect(err).toBe(undefined);
            }
        );

        setTimeout(() => {
            abort('超过 2s 了');
        }, 60);
    });

    test('测试6', () => {
        const [promise, abort] = cancelExec(async () => fn(1, '2', false));

        promise.then(
            data => {
                expect(data).toBe('超过 2s 了');
            },
            err => {
                expect(err).toBe(undefined);
            }
        );

        setTimeout(() => {
            abort(() => '超过 2s 了');
        }, 10);
    });

    test('测试7', () => {
        const [promise, abort] = cancelExec(() => fn(1, '2', false));

        promise.then(
            data => {
                expect(data).toBe(undefined);
            },
            err => {
                expect(err).toBe('超过 2s 了');
            }
        );

        setTimeout(() => {
            abort(() => Promise.reject('超过 2s 了'));
        }, 10);
    });

    test('测试8', () => {
        const [promise, abort] = cancelExec(() => fn(1, '2', false));

        promise.then(
            data => {
                expect(data).toBe('超过 2s 了');
            },
            err => {
                expect(err).toBe(undefined);
            }
        );

        setTimeout(() => {
            abort(() => Promise.resolve('超过 2s 了'));
        }, 10);
    });

    test('测试9', () => {
        const [promise, abort] = cancelExec(async () => fn(1, '2', false));

        promise.then(
            data => {
                expect(data).toBe(undefined);
            },
            err => {
                expect(err).toBe('超过 2s 了');
            }
        );

        setTimeout(() => {
            abort((...args: any) => {
                expect(args).toEqual([1, '2', false]);
                throw '超过 2s 了';
            });
        }, 10);
    });
});
