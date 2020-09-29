/**
 * 获取执行调用栈的最大大小
 *
 * @returns 返回调用栈大小，视个人情况而有所不同
 */
export default function maxCallStackSize(): number {
    try {
        return maxCallStackSize() + 1;
    } catch (_e) {
        return 1;
    }
}
