import { isBrowser, isNodejs } from '@curong/types';

/** 获取 `Crypto` 对象 */
export default function getCrypto(this: any): Crypto {
    let crypto: Crypto;

    if (isBrowser()) {
        crypto =
            window.crypto ??
            (window as any).webkitCrypto ??
            (window as any).mozCrypto ??
            (window as any).oCrypto ??
            (window as any).msCrypto;
    } else if (isNodejs()) {
        crypto = require('crypto').webcrypto;
    } else {
        throw new ReferenceError(
            '[getCrypto] 在浏览器或 Node.js 环境下没有检测到 crypto 对象',
            {
                cause: { this: this }
            }
        );
    }

    return crypto;
}
