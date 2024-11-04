import { email as sourceEmail } from './source';

let _: RegExp;

/**
 * 是否为合法的邮箱地址
 *
 * @param email 要判断的邮箱字符串
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
 * const ret = isEmail('wtklbm@gmail.com');
 * console.log(ret); // true
 * ```
 */
export default function isEmail(email: string): boolean {
    if (
        email.length > 320 ||
        !(_ ?? (_ = new RegExp(`^(?:${sourceEmail})$`))).test(email)
    ) {
        return false;
    }

    const [username, domains] = email.split('@');

    return (
        username.length <= 64 &&
        domains.length <= 255 &&
        domains.split('.').every(v => v.length <= 64)
    );
}
