import { nextTick } from '..';

test('@curong/function/nextTick', done => {
    let invoked: any;

    const callback = () => {
        invoked = true;
    };

    expect(nextTick(callback)).toBeUndefined();
    expect(invoked).toBeUndefined();

    setTimeout(() => {
        expect(invoked).toBe(true);
        invoked = [];
        nextTick(() => {
            invoked.push(0);
        });
        nextTick(() => {
            invoked.push(1);
        });
        nextTick(() => {
            invoked.push(2);
        });

        setTimeout(() => {
            expect(invoked).toEqual([0, 1, 2]);
            done();
        }, 10);
    }, 10);
});
