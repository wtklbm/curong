/**
 * 获取函数的最大参数的长度
 *
 * @returns 返回最大参数的长度。视个人情况而有所不同
 */
export default function maxArgsLength(): number {
    const args = { length: 0 };
    let count: number = 1;
    let result: number = 0;

    function callFn(): boolean {
        return true;
    }

    function tryFn(number: number): boolean {
        try {
            args.length = number;
            return callFn.apply(null, args as []);
        } catch (_e) {
            return false;
        }
    }

    while (tryFn(count)) {
        count *= 2;
    }

    for (let i = count-- / 2; i < count; ) {
        result = (i + count + 1) / 2;

        if (tryFn(result)) {
            i = result;
        } else {
            count = result - 1;
        }
    }

    return result;
}
