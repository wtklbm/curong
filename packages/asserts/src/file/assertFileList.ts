import { isFileList } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `FileList` 对象
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertFileList(
    value: unknown,
    variableName: string
): asserts value is FileList {
    return typeGuard(
        { [variableName]: value },
        '不是一个 FileList 对象',
        isFileList
    );
}
