/**
 * 创建一个用于在两个值之间切换的工具
 *
 * @returns 返回一个对象，对象中包含以下属性:
 *  - `value`: 当前值
 *  - `toggle`: 切换当前值
 *  - `setLeft`: 设置当前值为默认值
 *  - `setRight`: 设置当前值为反转值
 * @example
 *
 * ```typescript
 * const bool = toggle(false, true);
 *
 * console.log(bool.value); // false
 * console.log(bool.toggle()); // true
 * bool.setLeft();
 * console.log(bool.value); // false
 * bool.setRight();
 * console.log(bool.value); // true
 * ```
 */
export default function toggle<L, R>(
    defaultValue: L,
    reverseValue: R
): {
    value: L | R;
    toggle: () => L | R;
    setLeft: () => void;
    setRight: () => void;
} {
    let value: L | R = defaultValue;

    return {
        /** 获取当前值 */
        get value() {
            return value;
        },

        /** 切换当前值 */
        toggle() {
            value = value === defaultValue ? reverseValue : defaultValue;
            return value;
        },

        /** 设置当前值为默认值 */
        setLeft() {
            value = defaultValue;
        },

        /** 设置当前值为反转值 */
        setRight() {
            value = reverseValue;
        }
    };
}
