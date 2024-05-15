import { release, type } from 'os';

/** 是不是 `Windows` 系统平台 */
export const isWindows = type() === 'Windows_NT';

/** 是不是 `macOS` 系统平台 */
export const isMacOS = type() === 'Darwin';

/** 是不是 `Linux` 系统平台 */
export const isLinux = type() === 'Linux';

/** 是不是 `Windows` 系统平台上的 `Linux` 子系统 */
export const isWSL = type() === 'Linux' && release().endsWith('Microsoft');
