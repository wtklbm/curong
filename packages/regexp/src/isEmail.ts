import { email as sourceEmail } from './source';

/**
 * 是否为合法的邮箱地址
 *
 * @param email 要判断的邮箱字符串
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isEmail(email: string): boolean {
    const emailReg = new RegExp(`^${sourceEmail}$`);

    if (email.length > 320 || !emailReg.test(email)) {
        return false;
    }

    const [username, domains] = email.split('@');

    return username.length <= 64 && domains.length <= 255;
}
