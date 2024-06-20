import { release, type } from 'os';

const osType = type();

/** 是不是 `Windows` 系统平台 */
export const isWindows = osType === 'Windows_NT';

/** 是不是 `macOS` 系统平台 */
export const isMacOS = osType === 'Darwin';

/** 是不是 `Linux` 系统平台 */
export const isLinux = osType === 'Linux';

/** 是不是 `Windows` 系统平台上的 `Linux` 子系统 */
export const isWSL = isLinux && release().endsWith('Microsoft');
