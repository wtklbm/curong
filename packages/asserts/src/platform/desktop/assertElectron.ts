import { isElectron } from '@curong/types';

/**
 * 当前的执行环境是不是 `Electron`
 *
 * @throws 如果不是则会抛出类型异常
 */
export default function assertElectron() {
    if (!isElectron()) {
        throw new TypeError('[assertElectron] 当前的执行环境不是 Electron');
    }
}
