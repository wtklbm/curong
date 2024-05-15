import { promises, readSync } from 'fs';

import { isNotZero, isNull, isZero } from '@curong/types';

const { open } = promises;

/**
 * 比较两个文件的内容是否相等
 *
 * @param pathString1 第一个文件的路径
 * @param pathString2 第二个文件的路径
 * @return 如果相等则返回 `true`，否则返回 `false`
 * @info 机械硬盘长期频繁写入某个区域会无法避免的产生坏道，但读取寿命是几乎无限的
 */
export default async function diffFile(
    pathString1: string,
    pathString2: string
): Promise<boolean> {
    const highWorkMark = 512;
    let position = 0;
    let compared = true;

    const readChunk = async (fd: number) => {
        const buffer = Buffer.alloc(highWorkMark);
        const readBytes = readSync(fd, buffer, 0, highWorkMark, position);

        return isZero(readBytes) ? null : buffer;
    };

    const fileHandle1 = await open(pathString1, 'r').catch(() => null);

    if (isNull(fileHandle1)) {
        return !compared;
    }

    const fileHandle2 = await open(pathString2, 'r').catch(() => null);

    if (isNull(fileHandle2)) {
        await fileHandle1!.close();
        return !compared;
    }

    const fd1 = fileHandle1.fd;
    const fd2 = fileHandle2.fd;

    while (true) {
        const chunk1 = await readChunk(fd1);
        const chunk2 = await readChunk(fd2);
        const nullChunk1 = isNull(chunk1);
        const nullChunk2 = isNull(chunk2);

        if (nullChunk1 && nullChunk2) {
            break;
        }

        if (nullChunk1 || nullChunk2 || isNotZero(chunk1!.compare(chunk2!))) {
            compared = false;
            break;
        }

        position += highWorkMark;
    }

    // 关闭文件描述符
    await fileHandle1.close();
    await fileHandle2.close();

    return compared;
}
