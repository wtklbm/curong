/**
 * 清除所有已分配的 `setTimeout` 定时器
 *
 * 这个函数尝试清除从 `0` 到最后一个分配的 `setTimeout` 定时器 `ID` 之间的所有定时器。
 * 这些定时器即使可能已经被执行或被清除，也会尝试清除它们。
 *
 * 有时定时器是动态设置的，当我们尝试清理定时器时，新的定时器会被动态添加。
 * 所以，该方法并不能总是保证所有的定时器都全部清除。如果想持续清除，请继续调用该函数。
 *
 * @returns 返回当前的定时器 `ID`，已备后续清理定时器时，继续从该 `ID` 处开始清除
 */
export default function clearTimeoutAll() {
    const maxTimeoutId = setTimeout(() => {});

    // @ts-ignore
    for (let i = 0; i <= maxTimeoutId; i++) {
        clearTimeout(i);
    }

    return maxTimeoutId;
}
