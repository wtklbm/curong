import getCrypto from '../../../../number/src/constants/getCrypto';

const crypto = getCrypto();

export default function randomUint8(length: number = 1): number[] {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array);
}
